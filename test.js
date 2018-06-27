pointsItems.push({ x: 100, y: 100, size: 100 });
pointsItems.push({ x: 100, y: 100, size: 100 });
pointsItems.push({ x1: -350, y1: 150, x2: 0, y2: 150 });
pointsItems.push({ x1: -350, y1: 100, x2: 0, y2: 200 });
items.push(addCircle(itemContainer, pointsItems[1]));
items.push(addSquare(itemContainer, pointsItems[2]));

items.push(addLine(itemContainer, pointsItems[3])); 
items.push(addLine(itemContainer, pointsItems[4])); 
items.push(intersectionLines(itemContainer, pointsItems[3], pointsItems[4]));

pointsItems.push({ x: 0, y: 0, size: 10 });
items.push(animatedCircle(itemContainer, pointsItems[6], [[300, 400], [400, 50], [500, 300]], {duration: 1000, r: Math.random() * 100}));

pointsItems.push({ x: -150, y: -100, size: 100 });
pointsItems.push({ x: -50, y: -100, size: 100 });
items.push(addCircle(itemContainer, pointsItems[7]));
items.push(addCircle(itemContainer, pointsItems[8]));
items.push(intersectionCircles(itemContainer, pointsItems[7], pointsItems[8])); 

initAngle({cx: -300, cy: -50, x1: 0, y1: 100, x2: 100, y2: 0, a: 90});