var Bot,Drag,EdgeBounce,EdgeWrap,Magnet,Mouse,Noise,Rnd,Spring,Vector,applyForces,bots,connectBlossom,connectMolecule,connectSpokes,connectSwarm,edge,main,refresh,restart,setupBots,setupForceConstants,setupProcessing;Drag=(function(){function a(){}a.k=0.05;a.applyForce=function(b){var c,d;d=b.velocity.mag();c=b.velocity.get();c.mult(-1);c.normalize();c.mult(a.k*d*d);return b.applyForce(c)};return a})();EdgeBounce=(function(){function a(){}a.applyForce=function(b){var c,d,e,f;c=b.location.x-window.width;d=b.location.x;if(c>0){b.applyForce(new Vector(-c,0))}if(d<0){b.applyForce(new Vector(-d,0))}e=b.location.y-window.height;f=b.location.y;if(e>0){b.applyForce(new Vector(0,-e))}if(f<0){return b.applyForce(new Vector(0,-f))}};return a})();EdgeWrap=(function(){function a(){}a.applyForce=function(b){var c,d,e,f;c=b.location.x-window.width;d=b.location.x;if(c>0){b.location.x=0}if(d<0){b.location.x=window.width}e=b.location.y-window.height;f=b.location.y;if(e>0){b.location.y=0}if(f<0){return b.location.y=window.height}};return a})();Magnet=(function(){function a(){}a.isActive=true;a.k=1;a.applyForce=function(b,c){var d,e;if(!a.isActive){return}e=Vector.sub(b.location,c.location);d=e.mag();e.normalize();e.mult((a.k*b.mass*c.mass)/(d*d));return b.applyForce(e)};return a})();Mouse=(function(){function a(){}a.isActive=false;a.k=0.7;a.applyForce=function(b){var c,d,e;if(!a.isActive){return}d=window.processing;e=new Vector(d.mouseX,d.mouseY);c=Vector.sub(e,b.location);c.normalize();c.mult(a.k);return b.applyForce(c)};return a})();Noise=(function(){function a(){}a.chance=0.5;a.scale=2;a.applyForce=function(b){var c,d;if(a.scale===0||Rnd.gate(100-a.chance)){return}c=Rnd.next(a.scale*b.mass)*Rnd.sign();d=Rnd.next(a.scale*b.mass)*Rnd.sign();return b.applyForce(new Vector(c,d))};return a})();Spring=(function(){function a(){}a.isActive=true;a.k=0.01;a.restLength=50;a.applyForce=function(b,c){var d,e,f;if(!Magnet.isActive){return}f=Vector.sub(b.location,c.location);d=f.mag();e=a.restLength-d;f.normalize();f.mult(a.k*e);b.applyForce(f);f.mult(-1);return c.applyForce(f)};return a})();Bot=(function(){function a(b){this.mass=b!=null?b:(Math.random()*10)+1;this.p=window.processing;this.acceleration=new Vector;this.velocity=Rnd.velocity();this.location=Rnd.location();this.friends=[]}a.prototype.drawShape=function(){this.p.pushMatrix();this.p.translate(this.location.x,this.location.y);this.p.rotate(this.velocity.heading());this.p.scale(0.5+this.mass/8);this.p.stroke(0,255,0);this.p.triangle(-4,4,8,0,-4,-4);return this.p.popMatrix()};a.prototype.drawLines=function(){var e,b,c,d;this.p.pushMatrix();this.p.stroke(75);d=this.friends;for(b=0,c=d.length;b<c;b++){e=d[b];this.p.line(this.location.x,this.location.y,e.location.x,e.location.y)}return this.p.popMatrix()};a.prototype.move=function(){this.velocity.add(this.acceleration);this.velocity.limit(10);this.location.add(this.velocity);return this.acceleration.mult(0)};a.prototype.applyForce=function(b){return this.acceleration.add(Vector.div(b,this.mass))};return a})();Rnd=(function(){function a(){}a.gate=function(b){return(Math.random()*100)<b};a.next=function(b,c){if(b==null){b=1}if(c==null){c=0}return(Math.random()*b)+c};a.location=function(){return new Vector(a.next(window.width),a.next(window.height))};a.velocity=function(){return new Vector(a.next(20)*a.sign(),a.next(20)*a.sign())};a.sign=function(){if(a.gate(50)){return 1}else{return -1}};return a})();Vector=(function(){function a(b,c,d){this.x=b!=null?b:0;this.y=c!=null?c:0;this.z=d!=null?d:0}a.prototype.add=function(b){this.x+=b.x;this.y+=b.y;return this.z+=b.z};a.prototype.get=function(){return new a(this.x,this.y,this.z)};a.prototype.cross=function(b){return new a(this.y*b.z-b.y*this.z,this.z*b.x-b.z*this.x,this.x*b.y-b.x*this.y)};a.prototype.div=function(b){var c;c=a.ensure(b);this.x/=c.x;this.y/=c.y;return this.z/=c.z};a.prototype.dist=function(b){var c;c=a.ensure(b);return a.dist(this,c)};a.prototype.hypot=function(c,d){if(c===0){return Math.abs(d)}else{return Math.abs(c)*Math.sqrt(1+Math.pow(d/c,2))}};a.prototype.dot=function(b){return this.x*b.x+this.y*b.y+this.z*b.z};a.prototype.heading=function(){return -Math.atan2(-this.y,this.x)};a.prototype.limit=function(b,c){var d;d=this.mag();if((b!=null)&&d>b){this.normalize();return this.mult(b)}else{if((c!=null)&&d<c){this.normalize();return this.mult(c)}}};a.prototype.mag=function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)};a.prototype.mult=function(b){var c;c=a.ensure(b);this.x*=c.x;this.y*=c.y;return this.z*=c.z};a.prototype.normalize=function(){var b;b=this.mag();if(b>0){return this.div(b)}};a.prototype.set=function(c,d,e){var b;return b=[c,d,e],this.x=b[0],this.y=b[1],this.z=b[2],b};a.prototype.sub=function(b){this.x-=b.z;this.y-=b.y;return this.z-=b.z};a.prototype.toArray=function(){return[this.x,this.y,this.z]};a.prototype.toString=function(){return"x:@x, y:@y, z:@z"};a.add=function(b,c){var d,e;d=a.ensure(b);e=a.ensure(c);return new a(d.x+e.x,d.y+e.y,d.z+e.z)};a.sub=function(b,c){var d,e;d=a.ensure(b);e=a.ensure(c);return new a(d.x-e.x,d.y-e.y,d.z-e.z)};a.div=function(b,c){var d,e;d=a.ensure(b);e=a.ensure(c);return new a(d.x/e.x,d.y/e.y,d.z/e.z)};a.ensure=function(b){if(typeof b==="number"){return new a(b,b,b)}else{return b}};a.dist=function(f,g){var d,e,c;c=[(f!=null?f.x:void 0)-(g!=null?g.x:void 0),(f!=null?f.y:void 0)-(g!=null?g.y:void 0)],d=c[0],e=c[1];return this.hypot(d,e)};a.hypot=function(c,d){if(c===0){return Math.abs(d)}else{return Math.abs(c)*Math.sqrt(1+Math.pow(d/c,2))}};a.dot=function(b,c){return b.dot(c)};a.cross=function(b,c){return b.cross(c)};a.angleBetween=function(b,c){return Math.acos(b.dot(c)/(b.mag()*c.mag()))};return a})();bots=[];edge=EdgeBounce;$(function(){var a,b;$(".restart").change(restart);$(".refresh").change(refresh);a=$('<canvas id="processing-canvas">').appendTo($("#screen"))[0];return b=new Processing(a,main)});main=function(b){var a;a=b;a.setup=setupProcessing(a);setupForceConstants();restart();return a.draw=function(){var l,c,d,e,f,g,h,i,j,k;a.background(51);for(c=0,g=bots.length;c<g;c++){l=bots[c];applyForces(l)}for(d=0,h=bots.length;d<h;d++){l=bots[d];l.move()}if(Spring.isActive){for(e=0,i=bots.length;e<i;e++){l=bots[e];l.drawLines()}}k=[];for(f=0,j=bots.length;f<j;f++){l=bots[f];k.push(l.drawShape())}return k}};setupProcessing=function(a){a.width=855;a.height=500;a.fill(128,255,128);window.width=a.width;window.height=a.height;window.midX=(a.width/2)>>0;window.midY=(a.height/2)>>0;window.processing=a;a.mousePressed=function(){return Mouse.isActive=!Mouse.isActive};return null};setupForceConstants=function(){Drag.k=0.05;Magnet.k=10;Spring.restLength=40;return Spring.k=0.01};restart=function(){refresh();return setupBots()};refresh=function(){switch($("#edge").val()){case"bounce":edge=EdgeBounce;break;case"wrap":edge=EdgeWrap}Noise.scale=$("#noise").val();Magnet.isActive=$("#magnets").is(":checked");return Spring.isActive=$("#springs").is(":checked")};setupBots=function(){var a,b;bots=[];a=parseInt($("#count").val());switch($("#type").val()){case"spokes":for(b=1;1<=a?b<=a:b>=a;1<=a?b++:b--){bots=bots.concat(connectSpokes())}break;case"swarm":for(b=1;1<=a?b<=a:b>=a;1<=a?b++:b--){bots=bots.concat(connectSwarm())}break;case"molecule":for(b=1;1<=a?b<=a:b>=a;1<=a?b++:b--){bots=bots.concat(connectMolecule())}break;case"blossom":for(b=1;1<=a?b<=a:b>=a;1<=a?b++:b--){bots=bots.concat(connectBlossom())}}return bots};applyForces=function(f){var g,h,a,b,c,d,e;if(Spring.isActive){e=f.friends;for(a=0,c=e.length;a<c;a++){g=e[a];Spring.applyForce(f,g)}}if(Magnet.isActive){for(b=0,d=bots.length;b<d;b++){h=bots[b];if(h!==f){Magnet.applyForce(f,h)}}}if(Mouse.isActive){Mouse.applyForce(f)}Drag.applyForce(f);Noise.applyForce(f);return edge.applyForce(f)};connectSpokes=function(){var a,b,c;a=new Bot(4);b=(function(){var d;d=[];for(c=0;c<10;c++){d.push(new Bot(4))}return d})();a.friends=b;return b.concat(a)};connectSwarm=function(){var a,b,c,d;a=new Bot(6);b=(function(){var e;e=[];for(d=0;d<16;d++){e.push(new Bot(4))}return e})();c=(function(){var e;e=[];for(d=0;d<24;d++){e.push(new Bot(1))}return e})();a.friends=b.concat(c);return b.concat(a,c)};connectMolecule=function(){var a,b,d,e,f,g,j,k,l;a=(function(){var c;c=[];for(l=0;l<6;l++){c.push(new Bot(5))}return c})();d=(function(){var c;c=[];for(b=0;b<3;b++){c.push(new Bot(3))}return c})();e=(function(){var c;c=[];for(b=0;b<2;b++){c.push(new Bot(3))}return c})();f=(function(){var c;c=[];for(b=0;b<2;b++){c.push(new Bot(3))}return c})();g=(function(){var c;c=[];for(b=0;b<2;b++){c.push(new Bot(3))}return c})();j=(function(){var c;c=[];for(b=0;b<2;b++){c.push(new Bot(3))}return c})();k=(function(){var c;c=[];for(b=0;b<3;b++){c.push(new Bot(3))}return c})();a[0].friends=d.concat([a[1]]);a[1].friends=e.concat([a[2]]);a[2].friends=f.concat([a[3]]);a[3].friends=g.concat([a[4]]);a[4].friends=j.concat([a[5]]);a[5].friends=k;return a.concat(d,e,f,g,j,k)};connectBlossom=function(){var b,c,d,e,f,g,h,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T;b=(function(){var a;a=[];for(T=0;T<2;T++){a.push(new Bot(8))}return a})();c=(function(){var a;a=[];for(T=0;T<4;T++){a.push(new Bot(4))}return a})();d=(function(){var a;a=[];for(T=0;T<4;T++){a.push(new Bot(4))}return a})();e=(function(){var a;a=[];for(T=0;T<4;T++){a.push(new Bot(2))}return a})();f=(function(){var a;a=[];for(T=0;T<4;T++){a.push(new Bot(2))}return a})();g=(function(){var a;a=[];for(T=0;T<4;T++){a.push(new Bot(2))}return a})();h=(function(){var a;a=[];for(T=0;T<4;T++){a.push(new Bot(2))}return a})();j=(function(){var a;a=[];for(T=0;T<4;T++){a.push(new Bot(2))}return a})();k=(function(){var a;a=[];for(T=0;T<4;T++){a.push(new Bot(2))}return a})();l=(function(){var a;a=[];for(T=0;T<4;T++){a.push(new Bot(2))}return a})();m=(function(){var a;a=[];for(T=0;T<4;T++){a.push(new Bot(2))}return a})();n=(function(){var a;a=[];for(T=0;T<2;T++){a.push(new Bot(1))}return a})();o=(function(){var a;a=[];for(T=0;T<2;T++){a.push(new Bot(1))}return a})();z=(function(){var a;a=[];for(T=0;T<2;T++){a.push(new Bot(1))}return a})();K=(function(){var a;a=[];for(T=0;T<2;T++){a.push(new Bot(1))}return a})();N=(function(){var a;a=[];for(T=0;T<2;T++){a.push(new Bot(1))}return a})();O=(function(){var a;a=[];for(T=0;T<2;T++){a.push(new Bot(1))}return a})();P=(function(){var a;a=[];for(T=0;T<2;T++){a.push(new Bot(1))}return a})();Q=(function(){var a;a=[];for(T=0;T<2;T++){a.push(new Bot(1))}return a})();R=(function(){var a;a=[];for(T=0;T<2;T++){a.push(new Bot(1))}return a})();S=(function(){var a;a=[];for(T=0;T<2;T++){a.push(new Bot(1))}return a})();p=(function(){var a;a=[];for(T=0;T<2;T++){a.push(new Bot(1))}return a})();q=(function(){var a;a=[];for(T=0;T<2;T++){a.push(new Bot(1))}return a})();r=(function(){var a;a=[];for(T=0;T<2;T++){a.push(new Bot(1))}return a})();s=(function(){var a;a=[];for(T=0;T<2;T++){a.push(new Bot(1))}return a})();t=(function(){var a;a=[];for(T=0;T<2;T++){a.push(new Bot(1))}return a})();u=(function(){var a;a=[];for(T=0;T<2;T++){a.push(new Bot(1))}return a})();v=(function(){var a;a=[];for(T=0;T<2;T++){a.push(new Bot(1))}return a})();w=(function(){var a;a=[];for(T=0;T<2;T++){a.push(new Bot(1))}return a})();x=(function(){var a;a=[];for(T=0;T<2;T++){a.push(new Bot(1))}return a})();y=(function(){var a;a=[];for(T=0;T<2;T++){a.push(new Bot(1))}return a})();A=(function(){var a;a=[];for(T=0;T<2;T++){a.push(new Bot(1))}return a})();B=(function(){var a;a=[];for(T=0;T<2;T++){a.push(new Bot(1))}return a})();C=(function(){var a;a=[];for(T=0;T<2;T++){a.push(new Bot(1))}return a})();D=(function(){var a;a=[];for(T=0;T<2;T++){a.push(new Bot(1))}return a})();E=(function(){var a;a=[];for(T=0;T<2;T++){a.push(new Bot(1))}return a})();F=(function(){var a;a=[];for(T=0;T<2;T++){a.push(new Bot(1))}return a})();G=(function(){var a;a=[];for(T=0;T<2;T++){a.push(new Bot(1))}return a})();H=(function(){var a;a=[];for(T=0;T<2;T++){a.push(new Bot(1))}return a})();I=(function(){var a;a=[];for(T=0;T<2;T++){a.push(new Bot(1))}return a})();J=(function(){var a;a=[];for(T=0;T<2;T++){a.push(new Bot(1))}return a})();L=(function(){var a;a=[];for(T=0;T<2;T++){a.push(new Bot(1))}return a})();M=(function(){var a;a=[];for(T=0;T<2;T++){a.push(new Bot(1))}return a})();b[0].friends=c.concat(b[1]);b[1].friends=d.concat(b[0]);c[0].friends=e;c[1].friends=f;c[2].friends=g;c[3].friends=h;d[0].friends=j;d[1].friends=k;d[2].friends=l;d[3].friends=m;e[0].friends=n;e[1].friends=o;e[2].friends=z;e[3].friends=K;f[0].friends=N;f[1].friends=O;f[2].friends=P;f[3].friends=Q;g[0].friends=R;g[1].friends=S;g[2].friends=p;g[3].friends=q;h[0].friends=r;h[1].friends=s;h[2].friends=t;h[3].friends=u;j[0].friends=v;j[1].friends=w;j[2].friends=x;j[3].friends=y;k[0].friends=A;k[1].friends=B;k[2].friends=C;k[3].friends=D;l[0].friends=E;l[1].friends=F;l[2].friends=G;l[3].friends=H;m[0].friends=I;m[1].friends=J;m[2].friends=L;m[3].friends=M;return b.concat(c,d,e,f,g,h,j,k,l,m,n,o,z,K,N,O,P,Q,R,S,p,q,r,s,t,u,v,w,x,y,A,B,C,D,E,F,G,H,I,J,L,M)};