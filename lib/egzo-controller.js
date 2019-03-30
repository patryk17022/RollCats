
export function EGZOControllerWindow(){
    var html =
"\
<table style='position: absolute; left: 0px; top: 0px; border: 1px solid black; padding: 5px; z-Index: 666; background-color: rgba(255, 255, 255, 0.2)'>\
<thead>\
<tr>\
    <td style='text-align: right'>Value</td>\
    <td><span id='egzocontrollerwindow-value'>0.0</span></td>\
</tr>\
<tr>\
    <td style='text-align: right'>Simulate </td>\
    <td><input type='checkbox' id='egzocontrollerwindow-simulate' checked/> (keyboard: W, E)</td>\
</tr>\
<tr>\
    <td style='text-align: right'></td>\
    <td><i>Press Q to show/hide</i></td>\
</tr>\
</thead>\
<tbody id='egzocontrollerwindow-network'>\
<tr>\
    <td style='text-align: right'>Luna IP </td>\
    <td><input type='text' id='egzocontrollerwindow-address' placeholder='0.0.0.0'/></td>\
</tr>\
<tr>\
    <td style='text-align: right'>Status</td>\
    <td><span id='egzocontrollerwindow-status'>disconnected</span></td>\
</tr>\
<tr>\
    <td style='text-align: right'></td>\
    <td><input type='button' value='Connect' id='egzocontrollerwindow-connect'/></td>\
</tr>\
</tbody>\
</table>\
";
    
    var wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    var container = wrapper.firstChild;
    document.body.appendChild(container);
    var settings;
    
    var dom = {
        container: container,
        options: document.getElementById('egzocontrollerwindow-options'),
        value: document.getElementById('egzocontrollerwindow-value'),
        address: document.getElementById('egzocontrollerwindow-address'),
        connect: document.getElementById('egzocontrollerwindow-connect'),
        status: document.getElementById('egzocontrollerwindow-status'),
        simulate: document.getElementById('egzocontrollerwindow-simulate'),
        network: document.getElementById('egzocontrollerwindow-network')
    };
    
    this.onconnect = function(address){ console.log(address); };
    
    this.isShown = function(){
        return dom.container.style.display != 'none';
    };
    
    this.show = function(bool){
        dom.container.style.display = bool ? 'block' : 'none';
    };
    
    this.setValue = function(value){
        dom.value.innerHTML = value.toFixed(2);
    };
    
    this.isSimulate = function()
    {
        return dom.simulate.checked;
    };
    
    this.setStatus = function(status)
    {
        dom.status.innerHTML = status;
    };
    
    this.address = function()
    {
        return dom.address.value;
    };
    
    dom.connect.onclick = (function()
    {
        settings.address = this.address();
        saveSettings();
        this.onconnect(this.address());
    }).bind(this);
    
    dom.simulate.onchange = (function(event)
    {
        settings.simulate = event.target.checked;
        saveSettings();
        dom.network.style.display = this.isSimulate() ? 'none' : '';
    }).bind(this);
    
    function saveSettings()
    {
        console.log(settings);
        document.location.hash = btoa(JSON.stringify(settings));
    }
    
    try{
        settings = JSON.parse(atob(document.location.hash.substr(1)));
        console.log(settings);
    }catch(e){
        settings = {
            address: '',
            simulate: true
        };
    }
    dom.address.value = settings.address;
    dom.simulate.checked = settings.simulate;
    
    console.log(dom.network.style.display);
    dom.network.style.display = this.isSimulate() ? 'none' : '';
}

function EGZOLunaSocket()
{
    var sock = null;
    this.url = "";
    this.value = 0;
    
    this.onstatus = function(info){ console.log(info); };
    
    function onmessage(data)
    {
        data = JSON.parse(data.data);
        if (data.value != undefined)
            this.value = data.value;
    }
    
    function onerror(e)
    {
        this.onstatus('error');
    }
    
    function onopen(e)
    {
        this.onstatus('connected');
    }
    
    function onclose(e)
    {
        this.onstatus('disconnected');
    }
    
    this.open = function(url)
    {
        this.url = url || this.url;
        this.close();
        
        this.onstatus('connecting...');
        sock = new WebSocket("ws://"+this.url+":1234");
        sock.onmessage = onmessage.bind(this);
        sock.onopen = onopen.bind(this);
        sock.onerror = onerror.bind(this);
    };
    
    this.close = function()
    {
        if (sock == null)
            return;
        sock.close();
        sock = null;
    };
}


export function EGZOController(){
    
    this.window = new EGZOControllerWindow();
    this.sock = new EGZOLunaSocket();
    
    // public
    this.value = 0;
    this.onvalue = function(){};
    
    // private
    var data = {
        dt: 1/20,
        range: {
            min: -1,
            max:  1
        },
        velocity: 1,
        direction: 0
    };
    
    var onKeyup = function(e){
        switch (e.key) {
            case 'w':
                if (data.direction == -1) data.direction = 0;
                break;
            case 'e':
                if (data.direction ==  1) data.direction = 0;
                break;
        }
    };
    
    var onKeydown = function(e){
        switch (e.key) {
            case 'w': data.direction = -1; break;
            case 'e': data.direction =  1; break;
            case 'q':
                this.window.show(!this.window.isShown());
        }
    };
    
    var onInterval = function(){
        var dv = data.velocity * data.dt;
        var newValue = this.value;
        
        if (this.window.isSimulate())
            newValue = this.value + data.direction * dv;
        else
            newValue += (this.sock.value - newValue)/2;
        
        this.value = Math.min(Math.max(data.range.min, newValue), data.range.max);
        
        this.window.setValue(this.value);
        this.onvalue(this.value);
    };
    
    document.addEventListener('keydown', onKeydown.bind(this));
    document.addEventListener('keyup', onKeyup.bind(this));
    
    this.window.onconnect = (function(address){
        this.sock.open(address);
    }).bind(this);
    
    this.sock.onstatus = (function(info)
    {
        this.window.setStatus(info);
    }).bind(this);
    
    if (!this.window.isSimulate())
        this.sock.open(this.window.address());
    
    setInterval(onInterval.bind(this), data.dt * 1000);
};

