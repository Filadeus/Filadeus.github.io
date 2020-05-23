(()=>{
    const cnv = document.querySelector('canvas');
    const ctx = cnv.getContext('2d');

    function init(){
        cnv.width = innerWidth;
        cnv.height = innerHeight;
    }
    init();

    const numberOfRings = 5;
    const ringRadiusOffset = 0;
    const ringRadius = 190;
    const waveOffset = 70; //['#f6bcd8', '#ed8ad8', '#cc6ad5', '#8d59b5', '#442599']
    const colors2 = ['#81f229', '#cff600', '#ffce03', '#ff2700', '#b80000'];
    const colors = ['#81f229', '#cff600', '#ffce03', '#ff2700', '#b80000'];
    let startAngle = 0;

    function updateRings() {
        for (let i = 0; i < numberOfRings; i++){
            let radius = i * ringRadiusOffset + ringRadius;
            let offsetAngle = i * waveOffset * Math.PI / 180;
            drawRing(radius, colors[i], offsetAngle);
        }

        startAngle >= 360 ? startAngle = 0 : startAngle++;
    }

    let centerX = cnv.width / 2;
    let centerY = cnv.height / 2;
    const maxWavesAmplitude = 12;
    const numberOfWaves = 8; 

    function drawRing(radius, colors, offsetAngle) {
        ctx.strokeStyle = colors;
        ctx.lineWidth = 5;

        ctx.beginPath();
        for (let j = -180; j < 180; j++) {
            let currentAngle = (j + startAngle) * Math.PI / 180;
            let displacement = 0;
            let now = Math.abs(j);

            if (now > 85) {
                displacement = (now - 85) / 105;
            }

            if (displacement >=1 ){
                displacement = 1;
            }

            let waveAmplitude = radius + displacement * Math.sin((currentAngle + offsetAngle) * numberOfWaves) * maxWavesAmplitude;
            let x = centerX + Math.cos(currentAngle) * waveAmplitude;
            let y = centerY + Math.sin(currentAngle) * waveAmplitude;
            j > -180 ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
            
        }
        
        ctx.closePath();
        ctx.stroke();
    }

    function loop() {
        cnv.width |= 0; //ctx.clearRect(0, 0, cnv.width, cnv.height);
        updateRings();
        requestAnimationFrame(loop);
    }
    loop();

    window.addEventListener('resize', init);

})();