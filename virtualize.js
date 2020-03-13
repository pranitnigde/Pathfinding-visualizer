// var script = document.createElement('script');
// script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
// script.type = 'text/javascript';
// document.getElementsByTagName('head')[0].appendChild(script);

var startRow = 9;
var startCol = 15;
var targetRow = 9;
var targetCol = 45;
var startFlagRow = 1;
var startFlagCol = 29; 

var checkFlag = false;
var running = false;

algorithm = ''


class Node {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.distance = Infinity;
    this.isVisited = false;
    this.isWall = false;
    this.previousNode = null;
  }
  
  isStart(){
  	return this.row == startRow && this.col == startCol;
  }

  isTarget(){
  	return this.row == targetRow && this.col == targetCOl;
  }

}


function getinitialgrid(argument) {
	board = []
	for(let i=0;i<18;i++){
		currentrow = []
		for(let j=0;j<60;j++){
			obj = new Node(i, j);
			currentrow.push(obj);
		}
		board.push(currentrow);
	}
	return board;
}

// -=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=

$(document).ready(function(){

	$("td").click(function(){
		var nodeID = $(this).attr('id');
		if ((nodeID === startRow+"-"+startCol) || (nodeID === targetRow+"-"+targetCol) ||(nodeID === startFlagRow+"-"+startFlagCol)){
			return;
		}
  		cellnode = nodeID.split('-');
  		row = cellnode[0];
  		col = cellnode[1];
  		if (grid[row][col].isWall === false) {
  			grid[row][col].isWall = true;
	  		$(this).addClass('wall');		
  		}
  		else{
  			grid[row][col].isWall = false;
	  		$(this).removeClass('wall');
  		}	
	});  


// ====================

$(".start").mousedown(function(){
	var startmouseflag = true;
	var prevStartNode = $(this);
	$(".unvisited").mouseenter(function(){

		if (startmouseflag === true){  
			$(prevStartNode).removeClass('start');
			$(prevStartNode).addClass('unvisited');
			$(this).removeClass('unvisited');
			$(this).addClass('start');
			prevStartNode = $(this);
		}
		else{
			return;
		}

		$(".start").mouseup(function(){
			nodeID = $(this).attr('id');
			cellnode = nodeID.split('-');
			startRow = cellnode[0];
  			startCol = cellnode[1];
			startmouseflag = false;
		
			return;
		});

	});	
	
});


$(".target").mousedown(function(){
	var targetmouseflag = true;
	var prevStartNode = $(this);
	$(".unvisited").mouseenter(function(){

		if (targetmouseflag === true){  

			$(prevStartNode).removeClass('target');
			$(prevStartNode).addClass('unvisited');
			$(this).removeClass('unvisited');
			$(this).addClass('target');
			prevStartNode = $(this);
		}
		else{
			return;
		}

		$(".target").mouseup(function(){

			nodeID = $(this).attr('id');
			cellnode = nodeID.split('-');
			targetRow = cellnode[0];
  			targetCol = cellnode[1];
			targetmouseflag = false;

			return;
		});

	});	
	
});



});


// *************************  Dijkstra Algorithm Animation  *****************************************
function  animate(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 15 * i); 
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if($( `#${node.row}-${node.col}` ).hasClass( "node-visited" )){
        	document.getElementById(`${node.row}-${node.col}`).className = 'node-visited1';
        }
        else document.getElementById(`${node.row}-${node.col}`).className = 'node-visited';
      }, 15 * i);
    }   
 }


function  animateFlag(visitedNodesInOrder, flagvisitedNodesInOrder, nodesInShortestPathOrder, n) {
	var cnt=0;
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if($( `#${node.row}-${node.col}` ).hasClass( "node-visited" )){
        	document.getElementById(`${node.row}-${node.col}`).className = 'flag-node-visited1';
        }
        else document.getElementById(`${node.row}-${node.col}`).className = 'flag-node-visited';
       
      }, 15 * i);
      cnt=i;
    }   
    for (let j = 0; j <= flagvisitedNodesInOrder.length; j++) {
      if (j === flagvisitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateFlagShortestPath(nodesInShortestPathOrder, n);
        }, 15 * (j+cnt)); 
        return;
      }
      setTimeout(() => {
        const node1 = flagvisitedNodesInOrder[j];
        if($( `#${node1.row}-${node1.col}` ).hasClass( "node-visited" )){
        	document.getElementById(`${node1.row}-${node1.col}`).className = 'node-visited1';
        }
        else document.getElementById(`${node1.row}-${node1.col}`).className = 'node-visited';
      }, 15 * (cnt+j));
    } 
 }


function animateShortestPath(nodesInShortestPathOrder) {
	let r = 0;
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`${node.row}-${node.col}`).className = 'node-shortest-path';
      }, 50 * i);
      r=i;
    }
// ====================================

		setTimeout(() => {
			// console.log('running off');
			$("#Virtualize_button").css({ 'background-color' : '#007bff'});
      		running = false;
      }, 50 * r);

}

function animateFlagShortestPath(nodesInShortestPathOrder, n) {
    let cnt, r;
    for (let ii= 0; ii < n; ii++) {
    	r = ii;
      setTimeout(() => {
        const node = nodesInShortestPathOrder[ii];
        document.getElementById(`${node.row}-${node.col}`).className = 'flag-node-shortest-path';
      }, 50 * ii);
      cnt = ii;
    }
    for (let j = cnt; j < nodesInShortestPathOrder.length; j++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[j];
        document.getElementById(`${node.row}-${node.col}`).className = 'node-shortest-path';
      }, 50 * j);
    }
    setTimeout(() => {
			// console.log('running off');
      		running = false;
      		// $("#Virtualize_button").css({ 'background-color' : 'blue'});
      }, 50 * r);
}

// ############################# Dijkstra Algorithm  ######################################

function dijkstra(grid, startNode, finishNode){
	const visitedNodesInOrder = [];
	startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while(!!unvisitedNodes.length) {
    	sortNodesByDistance(unvisitedNodes);
    	const closestNode = unvisitedNodes.shift();

    	if (closestNode.isWall) continue;

    	if (closestNode.distance === Infinity) return visitedNodesInOrder;
    	
    	closestNode.isVisited = true;
    	visitedNodesInOrder.push(closestNode);

    	if (closestNode === finishNode) return visitedNodesInOrder;

    	updateUnvisitedNeighbors(closestNode, grid); 

    }
}

// --------------------------------------------------------------------
function DFS(grid, startNode, finishNode){
	const visitedNodesInOrder = [];
	const stack = [];
	stack.push(startNode);

	startNode.previousNode = null;
	while(!!stack.length) {
	
		curNode = stack.pop();
		if (curNode.isWall){
			curNode.isVisited= true;			
			continue;
		}

		curNode.isVisited = true;
		visitedNodesInOrder.push(curNode);

		if (curNode === finishNode) return visitedNodesInOrder;

		neighbourNodes = getUnvisitedNeighbors(curNode, grid)
		for(let i = 0;i < neighbourNodes.length;i++){
			if (neighbourNodes[i].isWall === true ) continue;	
			neighbourNodes[i].previousNode = curNode;
			stack.push(neighbourNodes[i]);
		}
	}
	return visitedNodesInOrder;
}

// --------------------------------------------------------------------

function BFS(grid, startNode, finishNode){
	const visitedNodesInOrder = [];
	const queue = [];
	startNode.previousNode = null;
	startNode.isVisited = true;
	queue.push(startNode);
	while(!!queue.length) {

		curNode = queue.shift();

		if (curNode.isWall){
			curNode.isVisited= true;			
			continue;
		}
		
		visitedNodesInOrder.push(curNode);

		if (curNode === finishNode) return visitedNodesInOrder;
		
		neighbourNodes = getUnvisitedNeighbors(curNode, grid)
		for(let i = 0;i < neighbourNodes.length;i++){
			if (neighbourNodes[i].isWall === true ) continue;
			neighbourNodes[i].isVisited = true;
			neighbourNodes[i].previousNode = curNode;
			queue.push(neighbourNodes[i]);
		}

	}
	return visitedNodesInOrder;
}

// --------------------------------------------------------------------
// ======================== A-Star Algo =============================



function Astar(grid, start, target){
	g = []
	for(let i=0;i<18;i++){
		currentrow = []
		for(let j=0;j<60;j++){
			obj = new Node(i, j);
			currentrow.push(obj);
		}
		g.push(currentrow);
	}
	for(let i=0;i<18;i++){
		for(let j=0;j<60;j++){
			g[i][j] = Math.abs(target.row - i) + Math.abs(target.col - j);
		}
	}


	openList = [];
	closeList = [];
	start.distance = 0;

	openList.unshift(start);
cnt =0;
	while(!! openList.length){
		curNode = openList.shift();
		curNode.isVisited = true;
		closeList.push(curNode);
		// console.log(curNode);

		nebhours = getAstarNebhour(curNode); 
		// console.log('nebhours'); 
		for(let i = 0;i<nebhours.length;i++){
			// console.log('enter :'+nebhours[i].row+'-'+nebhours[i].col)
			nebhours[i].previousNode = curNode;
			if (nebhours[i] === target) {
				closeList.push(nebhours[i]);
				console.log('found path');
				return closeList;
			}
			if(nebhours[i].isVisited === true) continue;
			// console.log('end :'+nebhours[i].row+'-'+nebhours[i].col)
			openList.unshift(nebhours[i]);
		}
		sortNodesByDistance(openList);
		
	}
	return closeList;
	
}


function getAstarNebhour(curNode){
	const neighbors1 = [];
	const neighbors2 = [];
	const res = [];
  const {col, row} = curNode;
  
  if (col > 0) neighbors1.push(grid[row][col - 1]);
  if (row < grid.length - 1) neighbors1.push(grid[row + 1][col]);
  if (col < grid[0].length - 1) neighbors1.push(grid[row][col + 1]);
  if (row > 0) neighbors1.push(grid[row - 1][col]);

 
  for (let i = 0;i<neighbors1.length;i++){
  	if(neighbors1[i].isWall === true)  continue;
  	const node = neighbors1[i];
  	if(isPresence(neighbors1[i], closeList)) continue;
  	// const f = curNode.distance + g[node.row][node.col] + 1;  
  	const f = g[node.row][node.col] + 1;
  	if (f>=neighbors1[i].distance) continue;
  	neighbors1[i].distance = f;
  	// console.log('push :'+neighbors1[i].row+'-'+neighbors1[i].col);
  	res.push(neighbors1[i]);
  }

  return res;

}

function isPresence(node, closeList){
	for(let i=0;i<closeList.length;i++){
		if(node === closeList[i]) return true;
	}
	return false;
}

// -------------------------------------------------------------------
// ========================Greedy Best First =========================

function GreedyBestFirst(grid, start, target){

	g = []
	for(let i=0;i<18;i++){
		currentrow = []
		for(let j=0;j<60;j++){
			obj = new Node(i, j);
			currentrow.push(obj);
		}
		g.push(currentrow);
	}
	for(let i=0;i<18;i++){
		for(let j=0;j<60;j++){
			g[i][j] = Math.abs(target.row - i) + Math.abs(target.col - j);
		}
	}


	const visitedNodesInOrder = [];
	const pqueue = [];
	startNode.previousNode = null;
	startNode.isVisited = true;
	startNode.distance = 0;
	pqueue.push(startNode);
	while(!!pqueue.length) {

		curNode = pqueue.shift();
		// console.log(curNode.row+'-'+curNode.col);

		if (curNode.isWall){
			curNode.isVisited= true;			
			continue;
		}
		
		visitedNodesInOrder.push(curNode);

		if (curNode === finishNode) return visitedNodesInOrder;
		
		neighbourNodes = getUnvisitedNeighbors(curNode, grid)
		for(let i = 0;i < neighbourNodes.length;i++){
			if (neighbourNodes[i].isWall === true ) continue;
			neighbourNodes[i].isVisited = true;
			neighbourNodes[i].previousNode = curNode;
			neighbourNodes[i].distance = g[neighbourNodes[i].row][neighbourNodes[i].col];
			pqueue.push(neighbourNodes[i]);
		}
		sortNodesByDistance(pqueue);
	}
	return visitedNodesInOrder;
}

// --------------------------------------------------------------------
function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort(function(nodeA, nodeB) {return nodeA.distance - nodeB.distance});
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const {col, row} = node;
  
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (row > 0) neighbors.push(grid[row - 1][col]);

  return neighbors.filter(neighbor => !neighbor.isVisited); 
}

function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  if (nodesInShortestPathOrder.length === 1) return [];
  return nodesInShortestPathOrder;
}


 // ##########################################################  

function clearpath(){
	if(running == true){
		return false;
	}
	for(let i=0;i<18;i++){
		for(let j=0;j<60;j++){

			node = grid[i][j];

			if ((node.row === startRow && node.col === startCol) || (node.row === targetRow && node.col === targetCol)  ){continue;}
			
			if (node.isWall === true) continue;

			if (checkFlag === true && (node.row === startRow && node.col === startCol)) continue;

			document.getElementById(`${i}-${j}`).className = 'unvisited';
			// grid[i][j].isWall = false;
			grid[i][j].isVisited = false;
			grid[i][j].distance = Infinity;
			grid[i][j].previousNode = null;
		}
	}
	document.getElementById(`${startRow}-${startCol}`).className = 'start';
	document.getElementById(`${targetRow}-${targetCol}`).className = 'target';
	if (checkFlag === true){document.getElementById(`${startFlagRow}-${startFlagCol}`).className = 'flag';}
	
}

function clearboard(){
	if(running == true){
		return false;
	}
	for(let i=0;i<18;i++){
		for(let j=0;j<60;j++){
			if (i === 9 && j === 15){
				document.getElementById(`${i}-${j}`).className = 'start';
			}
			else if (i === 9 && j === 45){
				document.getElementById(`${i}-${j}`).className = 'target';
			}
			else{
				document.getElementById(`${i}-${j}`).className = 'unvisited';
			}
			grid[i][j].isWall = false;
			grid[i][j].isVisited = false;
			grid[i][j].distance = Infinity;
			grid[i][j].previousNode = null;
		}
	}
	checkFlag = false;
	startRow = 9;
	startCol = 15;
	targetRow = 9;
	targetCol = 45;
}


// -========================--------------------=========================

var grid = getinitialgrid();



function addflag(){
	if(running == true){
		return false;
	}

	document.getElementById(`${startFlagRow}-${startFlagCol}`).className = 'flag';
	checkFlag = true;

	$(".flag").mousedown(function(){

	var targetmouseflag = true;
	var prevStartNode = $(this);
	$(".unvisited").mouseenter(function(){

		if (targetmouseflag === true){  

			$(prevStartNode).removeClass('flag');
			$(prevStartNode).addClass('unvisited');
			$(this).removeClass('unvisited');
			$(this).addClass('flag');
			prevStartNode = $(this);
		}
		else{
			return;
		}

		$(".flag").mouseup(function(){

			nodeID = $(this).attr('id');
			cellnode = nodeID.split('-');
			startFlagRow = cellnode[0];
  			startFlagCol = cellnode[1];
			targetmouseflag = false;

			return;
		});

	});	
	
});

}



function algo(val){
	algorithm = val;
}

function init(){
	if(running == true){
		return false;
	}
	
	running = true;
	// $("#Virtualize_button").css({ 'background-color' : 'red'});
	
	clearpath();
	switch(algorithm){
		case 'Dijkstra':
		$("#Virtualize_button").css({ 'background-color' : '#c20000'});
		        clearpath();
			var x = document.getElementById("snackbar")
			x.className = "show";
			setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
			if (checkFlag === false){
				startNode = grid[startRow][startCol];
				finishNode = grid[targetRow][targetCol];
			 	startNode.isVisited = false;
				finishNode.isVisited = false;
				var visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
			    var nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
				this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
			}
			else{
				startNode = grid[startRow][startCol];
				flagNode = grid[startFlagRow][startFlagCol];
				finishNode = grid[targetRow][targetCol];
			 	startNode.isVisited = false;
				finishNode.isVisited = false;
			 	var visitedNodesInOrder = dijkstra(grid, startNode, flagNode);
				var nodesInShortestPathOrder = getNodesInShortestPathOrder(flagNode);
				var n = nodesInShortestPathOrder.length
				for(let i=0;i<18;i++){
					for(let j=0;j<60;j++){

						node = grid[i][j];
						
						if (node.isWall === true){ 
							isVisited = false;
							continue;
						}

						grid[i][j].isVisited = false;
						grid[i][j].distance = Infinity;
						grid[i][j].previousNode = null;
						
					}
				}
				var flagvisitedNodesInOrder = dijkstra(grid, flagNode, finishNode);
				var flagnodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
				shortestpath = nodesInShortestPathOrder.concat(flagnodesInShortestPathOrder);
				this.animateFlag(visitedNodesInOrder, flagvisitedNodesInOrder, shortestpath, n);
					
			}
			break;

		case 'DFS':
		$("#Virtualize_button").css({ 'background-color' : '#c20000'});
			clearpath();
			var x = document.getElementById("snackbar1")
			x.className = "show";
			setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

			if (checkFlag === false){
				startNode = grid[startRow][startCol];
				finishNode = grid[targetRow][targetCol];
			 	startNode.isVisited = false;
				finishNode.isVisited = false;
				var visitedNodesInOrder = DFS(grid, startNode, finishNode);
			    var nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
			    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
			}
			else{
				startNode = grid[startRow][startCol];
				flagNode = grid[startFlagRow][startFlagCol];
				finishNode = grid[targetRow][targetCol];
			 	startNode.isVisited = false;
				finishNode.isVisited = false;
			 	var visitedNodesInOrder = DFS(grid, startNode, flagNode);
				var nodesInShortestPathOrder = getNodesInShortestPathOrder(flagNode);
				var n = nodesInShortestPathOrder.length;
				for(let i=0;i<18;i++){
					for(let j=0;j<60;j++){

						node = grid[i][j];
						
						if (node.isWall === true){ 
							isVisited = false;
							continue;
						}

						grid[i][j].isVisited = false;
						grid[i][j].distance = Infinity;
						grid[i][j].previousNode = null;
						
					}
				}
				var flagvisitedNodesInOrder = DFS(grid, flagNode, finishNode);
				var flagnodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
				shortestpath = nodesInShortestPathOrder.concat(flagnodesInShortestPathOrder);
				this.animateFlag(visitedNodesInOrder, flagvisitedNodesInOrder, shortestpath, n);
					
			}
			break;

		case 'BFS':
		$("#Virtualize_button").css({ 'background-color' : '#c20000'});
		clearpath();
			var x = document.getElementById("snackbar2")
			x.className = "show";
			setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

			if (checkFlag === false){
				startNode = grid[startRow][startCol];
				finishNode = grid[targetRow][targetCol];
				startNode.isVisited = false;
				finishNode.isVisited = false;
			 
				var visitedNodesInOrder = BFS(grid, startNode, finishNode);
			    var nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
			    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);

			}
			else{
				startNode = grid[startRow][startCol];
				flagNode = grid[startFlagRow][startFlagCol];
				finishNode = grid[targetRow][targetCol];
			 	startNode.isVisited = false;
				finishNode.isVisited = false;

			 	var visitedNodesInOrder = BFS(grid, startNode, flagNode);
				var nodesInShortestPathOrder = getNodesInShortestPathOrder(flagNode);
				var n = nodesInShortestPathOrder.length;
				for(let i=0;i<18;i++){
					for(let j=0;j<60;j++){

						node = grid[i][j];
						
						if (node.isWall === true){ 
							isVisited = false;
							continue;
						}

						grid[i][j].isVisited = false;
						grid[i][j].distance = Infinity;
						grid[i][j].previousNode = null;
						
					}
				}
				var flagvisitedNodesInOrder = BFS(grid, flagNode, finishNode);
				var flagnodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
				shortestpath = nodesInShortestPathOrder.concat(flagnodesInShortestPathOrder);
				this.animateFlag(visitedNodesInOrder, flagvisitedNodesInOrder, shortestpath, n);
					
			}
			break;

		case 'Astar':
		$("#Virtualize_button").css({ 'background-color' : '#c20000'});
				startNode = grid[startRow][startCol];
				finishNode = grid[targetRow][targetCol];
				startNode.isVisited = false;
				finishNode.isVisited = false;

				document.getElementById(`${startFlagRow}-${startFlagCol}`).className = 'unvisited';

				var visitedNodesInOrder = Astar(grid, startNode, finishNode);
			    var nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
			    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
			break;

		case 'GreedyBestFirst':
		$("#Virtualize_button").css({ 'background-color' : '#c20000'});
				startNode = grid[startRow][startCol];
				finishNode = grid[targetRow][targetCol];
				startNode.isVisited = false;
				finishNode.isVisited = false;
				document.getElementById(`${startFlagRow}-${startFlagCol}`).className = 'unvisited';

				var visitedNodesInOrder = GreedyBestFirst(grid, startNode, finishNode);
			    var nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
			    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
			break;

		default:alert('Choose an Algorithm!');
			break
	}


		
}



function maze(pattern){
	if(running == true){
		return false;
	}
	switch (pattern){
		case 'basicRandomMaze':
				clearboard();
				let hor = [];
				let ver = [];

				for (let i = 0; i < 400; i++){
					hor.push(Math.floor(Math.random() * 18) + 1 );
					ver.push(Math.floor(Math.random() * 60) + 1 );
				}
				for (j=0;j<hor.length;j++){
					if (grid[hor[j]-1][ver[j]-1] === grid[startRow][startCol] || grid[hor[j]-1][ver[j]-1] === grid[targetRow][targetCol] || grid[hor[j]-1][ver[j]-1] === grid[startFlagRow][startFlagCol]) continue;
					grid[hor[j]-1][ver[j]-1].isWall = true;
					document.getElementById(`${hor[j]-1}-${ver[j]-1}`).className = 'wall';
				}
			break;
		case 'basicStair':
				clearboard();
				flow = true;
				j = 0;
				i = 16;
				while(j < 59){
					grid[i][j].isWall = true;
					document.getElementById(`${i}-${j}`).className = 'wall';
					if (i === 1) flow = false;
					if (i === 16) flow = true;
					if (flow) i--;
					else i++;
					j++
				}
			break;
		default: break;
	}
}



























// Dragging try to create wall


// $(".unvisited").mousedown(function(){
// 	console.log('mouse is down!');
// 	nodeID = $(this).attr('id');
// 	cellnode = nodeID.split('-');
// 	row = cellnode[0];
// 	col = cellnode[1];
// 	if (grid[row][col].isWall === false) {
// 		grid[row][col].isWall = true;
// 	$(this).addClass('wall');		
// 	}
// 	else{
// 		grid[row][col].isWall = false;
// 		$(this).removeClass('wall');
// 	}
// 	var wallmouseflag = true;
// 	// var prevStartNode = $(this).attr('class');
    
// 	if (ifcheck = $(".wall").mouseup(function() {
// 			console.log('mouse is up now onclick');
// 			ifcheck = true;
// 			return ifcheck;
// 		}); ){
// 		console.log('mouse is up now');
// 		wallmouseflag = false;
// 		return;
// 	}


// 	$(".unvisited").mouseenter(function(){
// 		// prevStartNode = $(this).attr('class');
// 		if (wallmouseflag === true){
// 			// console.log('mouse enters');
// 			// $(prevStartNode).removeClass('unvisited');
// 			// $(prevStartNode).addClass('unvisited');
			
// 			nodeID = $(this).attr('id');
// 			cellnode = nodeID.split('-');
// 			row = cellnode[0];
//   			col = cellnode[1];
// 	  		if (grid[row][col].isWall === false) {
// 	  			grid[row][col].isWall = true;
// 				$(this).addClass('wall');		
// 	  		}
// 	  		else{
// 	  			grid[row][col].isWall = false;
// 		  		$(this).removeClass('wall');
// 	  		}
// 		}
// 		else{
// 			return;
// 		}

		

// 		$(".wall").mouseup(function(){
// 			console.log('mouse is up now');
// 			wallmouseflag = false;
// 			return;
// 		});

// 	});	
// });
