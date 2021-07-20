import React from 'react';

const Donut = () => {
    return (
        <>
              <div class="container">
               <div class="donut-chart-block block"> 
                 <div class="donut-chart">
                   <div id="part1" class="portion-block"><div class="circle"></div></div>
                   <div id="part2" class="portion-block"><div class="circle"></div></div>
                   <div id="part3" class="portion-block"><div class="circle"></div></div>
                   <div id="part4" class="portion-block"><div class="circle"></div></div>
                   <div id="part5" class="portion-block"><div class="circle"></div></div>
                   <p class="center"></p>        
                 </div>
               </div>
               <div>
                 <ul>
                   <li>A</li>
                   <li>A</li>
                   <li>A</li>
                   <li>A</li>
                   <li>A</li>
                 </ul>
               </div>
             </div>
        </>
    );
}

export default Donut;





// // donutwa
// * {
//   -webkit-box-sizing: border-box;
//   -moz-box-sizing: border-box;
//   box-sizing: border-box;  
// }

// .donut-chart {
//   position: relative;
// 	width: 200px;
//   height: 200px;
// 	margin: 0 auto 2rem;
// 	border-radius: 100%
//  }
// p.center {
//   background: #ffffff;
//   position: absolute;
//   text-align: center;
//   font-size: 28px;
//   top:0;left:0;bottom:0;right:0;
//   width: 130px;
//   height: 130px;
//   margin: auto;
//   border-radius: 50%;
//   line-height: 35px;
//   padding: 15% 0 0;
// }	
// .portion-block {
//     border-radius: 50%;
//     clip: rect(0px, 200px, 200px, 100px);
//     height: 100%;
//     position: absolute;
//     width: 100%;
//   }
// .circle {
//     border-radius: 50%;
//     clip: rect(0px, 100px, 200px, 0px);
//     height: 100%;
//     position: absolute;
//     width: 100%;
//     font-family: monospace;
//     font-size: 1.5rem;
// }	
// #part1 {
//     transform: rotate(0deg);
//   }

// 	#part1 .circle {
// 		background-color: #E64C65;
// 		transform: rotate(130deg);
// 		animation: first 1s 1 forwards;
// 	  }
	
	
// #part2 {
//     transform: rotate(100deg);
//   }
// #part2 .circle {
//     background-color: #11A8AB;
//     animation: second 1s 1 forwards 1s;
//   }
// #part3 {
//     transform: rotate(170deg);
// }
// 	#part3 .circle {
// 		background-color: #4FC4F6;
// 		animation: third 0.5s 1 forwards 2s;
// }
// #part4 {
//   transform: rotate(200deg);
// }
// #part4 .circle {
//   background-color: #1643CB;
//   animation: second 1s 1 forwards 1s;
// }
// #part5 {
//   transform: rotate(220deg);
// }
// #part5 .circle {
//   background-color: #12B34D;
//   animation: second 1s 1 forwards 1s;
// }
	
// /* Animation */
// @keyframes first {
//     from {transform: rotate(0deg);}
//     to {transform: rotate(100deg);}
// }
	
// @keyframes second {
//     from {transform: rotate(0deg);}
//     to {transform: rotate(150deg);}
// }
	
// @keyframes third {
//     from {transform: rotate(0deg);}
//     to {transform: rotate(111deg);}
// }
