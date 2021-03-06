







var gui = new dat.GUI();
function main()
{
    
    var canvas= document.getElementById("glcanvas");
    var gl = canvas.getContext("webgl2");
    if(!gl)
    {
        alert("This needs wegl2");
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ex = gl.getExtension('EXT_color_buffer_float');
    var ex1 =     gl.getExtension('OES_texture_float_linear');
    if(!ex||!ex1)
    {
        alert("This needs EXT_color_buffer_float and OES_texture_float_linear");
    }
    
  
    
    var mat = new ViewMatrix2D([0,0],-2,-Math.PI/2,canvas);
   
    
    var buddhas =[new Buddha(gl,500,[255,0,0]),new Buddha(gl,200,[0,255,0]),new Buddha(gl,60,[0,0,255])]
    window.onresize = ()=>
    {
        buddhas.forEach((elmt)=>{elmt.createOrbitFB();});

        
    }
    
        

    buddhas.forEach((elmt)=>{elmt.viewMatrix = mat.getMatrix();elmt.updateImportanceMap();});

    var mandelbrot = new Mandelbrot(gl);            
    var inMove =false;

    function render()
    {
      
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        var m = mat.getMatrix(1);
        gl.clearColor(0,0,0,1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        if(mat.isDirty())
        {
            mandelbrot.draw();
            mandelbrot.uniforms.viewMatrix =m;
            inMove = true;

        }
        else
        {
            buddhas.forEach((elmt)=>{elmt.viewMatrix = m;})

            if(inMove)
            {
                buddhas.forEach((elmt)=>{elmt.reset();})
                inMove =false;

            }
            buddhas.forEach((elmt)=>{elmt.genOrbits();})
            buddhas.forEach((elmt)=>{elmt.traceOrbits();})
            buddhas.forEach((elmt)=>{elmt.draw();})
        }

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
};

main();

