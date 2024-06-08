function setup(){
  createCanvas(500,500);
  background(0,0,10);
  
  //to create text inside the shape
  cnv3 = createGraphics(width,height);
  cnv3.noStroke();//no border
  cnv3.fill("#D41E1E");// add some color
  
  scale(1.2);//increase the size of the shape
  cnv3.ellipse(150,200,350);
  cnv3.erase();
  
  //set the text and modify the shape of the text
  //font size
  cnv3.textSize(26);
  cnv3.text('Welcome',100,150);
  
  
  cnv3.textSize(24);
  cnv3.text('TO BATHSPA',70,200);
  
  image(cnv3,70,0); //insert the canve for positiing the text
}