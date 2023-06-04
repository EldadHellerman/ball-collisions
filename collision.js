<html>
<head>
    <title>Snake</title>
</head>
<body>
<img hidden id="apple" width="10" height="10" src="apple.png">
<canvas id="canvas" width="1000" height="640"><canvas>
<script>
    var appleIcon = document.getElementById("apple");
    var c;
    var snake, apples;
    var direction, currentDirection, points;
    var intervalID;

    function rect(x,y,w,h,clr){
        c.fillStyle = clr;
        c.fillRect(x,y,w,h);
    }

    function drawGrid(){
        rect(0,0,1000,640,"white");
        snake.forEach(function(p,i){rect(p.x*10,p.y*10,10,10,i==0 ? "pink" : "green");})
        //apples.forEach(function(p){rect(p.x*10,p.y*10,10,10,"red");})
        apples.forEach(function(p){c.drawImage(appleIcon, p.x*10, p.y*10);})
        c.font = "40px Arial";
        c.fillStyle = "black";
        c.fillText("Points: " + points, 500, 640);
    }

    function p(x,y){
        return({'x': x,'y': y});
    }

    function advanceSnake(){
        currentDirection = direction;
        x = snake[0].x;
        y = snake[0].y;
        if(currentDirection == "right") x++;
        else if(currentDirection == "left") x--;
        else if(currentDirection == "up") y--;
        else if(currentDirection == "down") y++;
        if(x == -1) x = 99; else if(x == 100) x = 0;
        if(y == -1) y = 59; else if(y == 60) y = 0;
        isThereASnake = false;
        snake.forEach(function(p,i){if(p.x == x && p.y == y) isThereASnake = true;});
        if(isThereASnake){
            gameOver();
            return;
        }
        snake.unshift(p(x,y));

        isThereAnApple = false;
        apples.forEach(function(p,i){if(p.x == x && p.y == y){ isThereAnApple = true; apples.splice(i,1);}});
        if(isThereAnApple){
            points++;
            if(addApple()) return;
        }else{
            snake.pop();
        }
        drawGrid();
    }

    function addApple(){
        t = 0;
        do{
            taken = false;
            point = p(Math.round(Math.random()*100),Math.round(Math.random()*60));
            snake.forEach(function(p,i){if(p.x == point.x && p.y == point.y) taken = true;});
            apples.forEach(function(p,i){if(p.x == point.x && p.y == point.y) taken = true;});
            if(t++ > 1000){ gameOver(); return true;}
        }while(taken);
        apples.push(point);
        return false;
    }

    function keyPressed(code){
        if(code == 119 && currentDirection != "down") direction = "up";
        else if(code == 115 && currentDirection != "up") direction = "down";
        else if(code == 100 && currentDirection != "left") direction = "right";
        else if(code == 97 && currentDirection != "right") direction = "left";
    }

    function gameOver(){
        clearInterval(intervalID);
        c.font = "60px Arial";
        c.fillStyle = "black";
        c.fillText("Game Over!", 450, 280);
        c.fillText(points + " Point" + (points != 1 ? "s" : ""), 480, 350);
        rect(0,600,1000,40,"white");
        setTimeout(startGame, 3000);
    }

    function startGame(){
        snake = new Array();
        apples = new Array();
        direction = "right";
        currentDirection = "right";
        points = 0;
        snake.push(p(4,0),p(3,0),p(2,0),p(1,0),p(0,0));
        addApple();
        drawGrid();
        intervalID = setInterval(advanceSnake,50);
        for(i=0; i<5000; i++) addApple();
    }

    c = document.getElementById("canvas").getContext("2d");
    document.onkeypress = function(e){if(window.event) keyPressed(e.keyCode); else if(e.which) keyPressed(e.keyCode);};
    startGame();
</script>
</body>
</html>
