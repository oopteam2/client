Flare.AudioEngine = function(mediaPlayer) {


    /**
     * @property Flare.VideoPlayer} mediaPlayer - A reference to the mediaPlayer.
     */
    this.mediaPlayer = mediaPlayer;
    this.audioCtx = null; //Remeber to check device.isCompatible
    this.mute;
    this.source = null;

    this.analyser;
    this.distortion;
    this.gainNode;
    this.biquadFilter;
    this.soundSource;

    return this;
};

Flare.AudioEngine.prototype = {
    boot: function() {
        this.audioCtx = new(window.AudioContext || window.webkitAudioContext)();
        //this.mute = document.querySelector('.muteButton');

        //this.analyser = audioCtx.createAnalyser();
        //this.distortion = audioCtx.createWaveShaper();
        this.gainNode = this.audioCtx.createGain();
        //this.biquadFilter = audioCtx.createBiquadFilter();
        this.source = this.audioCtx.createBufferSource();
        this.playing = false;
        //this.source.buffer = this.buffer.getAudioSource();//Buffer.read Waiting for Jens to finish is buffering

    },
    
    init: function (){
        //this.source.buffer = this.mediaPlayer.buffer.getAudioSource();//Buffer.read Waiting for Jens to finish is buffering
        
        this.audioCtx.decodeAudioData(this.mediaPlayer.buffer.getAudioSource(), function (decodedBuffer) {
            this.source.buffer = decodedBuffer;
            console.log("done loading buffer");
            this.source.connect(this.gainNode);
            this.gainNode.connect(this.audioCtx.destination);
        }. bind(this));
        
       

    },
    
    connectBuffer: function(decodedBuffer){
            this.source.buffer = decodedBuffer;
            console.log("done loading buffer");
            this.source.connect(this.gainNode);
            this.gainNode.connect(this.audioCtx.destination);
    },

    playSound: function(time) {
        
        /*
        if (!this.source.start) //If the browser does not support web audio
          this.source.start = source.noteOn;
        */
        this.source.start(time);
        this.playing = true;
    },

    stopSound: function(time) {
        /*
          if(!this.source.stop)
            this.source.stop = this.source.noteOff;
        */
        this.source.stop(time)
        this.playing = false;
    },

    toggle: function(time) {
        this.playing ? this.stop(time) : this.play(time);
        this.playing = !this.playing;
    },

    muteAudio: function() {
        if (this.mute.id != "activated") {
            this.gainNode.gainvalue = 0; //Muting
            this.mute.id = "activated";
            this.mute.innerHTML = "Unmute"; //Will probably change to a different button in the mediaplayer
        } else {
            this.gainNode.gain.value = 1;
            this.mute.id = "deactivated";
            this.mute.innerHTML = "Mute";
        }
    },

    changeVolume: function(rangeElement) {
      var volume = element.value;
      var portion = parseInt(volume) / parseInt(element.max);

      this.gainNode.gain.value = portion * portion;
    }


};

Flare.AudioEngine.prototype.constructor = Flare.AudioEngine;
