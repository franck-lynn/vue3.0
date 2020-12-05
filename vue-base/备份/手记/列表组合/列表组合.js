const curves = [
    [
        { operator: "M", x: 200, y: 200 },
        { operator: "M", x: 210.98076211353316, y: 253.66025403784437 },
        { operator: "M", x: 159.01923788646684, y: 236.33974596215558 }
    ],
    [
        { operator: "L", x: 120, y: 73.114 },
        { operator: "L", x: 360.86726149812546, y: 247.82122173508924 },
        { operator: "L", x: 89.13273850187461, y: 369.06477826491073 }
    ],
    [
        { operator: "A", startPoint: { x: 120, y: 73.114 }, r: 150, xAxisRoatation: 0, largeArcFlag: 0, endPoint: { x: 280, y: 73.114 } },
        { operator: "A", startPoint: { x: 120, y: 73.114 }, r: 150, xAxisRoatation: 0, largeArcFlag: 0, endPoint: { x: 280, y: 73.114 } },
        { operator: "A", tartPoint: { x: 89.13273850187461, y: 369.06477826491073 }, r: 150, xAxisRoatation: 0, largeArcFlag: 0, endPoint: { x: 9.132738501874556, y: 230.50071365940056 } }
    ],
    [
        { operator: "L", x: 200, y: 200 },
        { operator: "L", x: 210.98076211353316, y: 253.66025403784437 },
        { operator: "L", x: 159.01923788646684, y: 236.33974596215558 }
    ]
]
const convertCurves = curves => curves[0].map((_, i) => curves.map(row => row[i]))
console.log(
    convertCurves(curves)
)
/*
简化数学结构:
[
    M M M
    L L L
    A A A 
    B B B
]

[
    M L A B
    M L A B 
    M L A B 
]


*/


/*
! 原来的数据结构:
 [
     [
         { operator: "M", x: 200, y: 200 },
         { operator: "M", x: 210.98076211353316, y: 253.66025403784437 },
         { operator: "M", x: 159.01923788646684, y: 236.33974596215558 }
     ],
     [
         { operator: "L", x: 120, y: 73.114 },
         { operator: "L", x: 360.86726149812546, y: 247.82122173508924 },
         { operator: "L", x: 89.13273850187461, y: 369.06477826491073 }
     ],
     [
         { operator: "A", startPoint: { x: 120, y: 73.114 }, r: 150, xAxisRoatation: 0, largeArcFlag: 0, endPoint: { x: 280, y: 73.114 } },
         { operator: "A", startPoint: { x: 120, y: 73.114 }, r: 150, xAxisRoatation: 0, largeArcFlag: 0, endPoint: { x: 280, y: 73.114 } },
         { operator: "A", tartPoint: { x: 89.13273850187461, y: 369.06477826491073 }, r: 150, xAxisRoatation: 0, largeArcFlag: 0, endPoint: { x: 9.132738501874556, y: 230.50071365940056 } }
     ],
     [
         { operator: "L", x: 200, y: 200 },
         { operator: "L", x: 210.98076211353316, y: 253.66025403784437 },
         { operator: "L", x: 159.01923788646684, y: 236.33974596215558 }
     ]
 ]
! 要的数据结构
[
    [
        { operator: "M", x: 200, y: 200 },
        { operator: "L", x: 120, y: 73.114 },
        { operator: "A", startPoint: { x: 120, y: 73.114 }, r: 150, xAxisRoatation: 0, largeArcFlag: 0, endPoint: { x: 280, y: 73.114 } },
        { operator: "L", x: 200, y: 200 },
    ],
    [
        { operator: "M", x: 210.98076211353316, y: 253.66025403784437 },
        { operator: "L", x: 360.86726149812546, y: 247.82122173508924 },
        { operator: "A", startPoint: { x: 120, y: 73.114 }, r: 150, xAxisRoatation: 0, largeArcFlag: 0, endPoint: { x: 280, y: 73.114 } },
        { operator: "L", x: 210.98076211353316, y: 253.66025403784437 },
    ],
    [
        { operator: "M", x: 159.01923788646684, y: 236.33974596215558 },
        { operator: "L", x: 89.13273850187461, y: 369.06477826491073 },
        { operator: "L", x: 159.01923788646684, y: 236.33974596215558 },
        { operator: "A", tartPoint: { x: 89.13273850187461, y: 369.06477826491073 }, r: 150, xAxisRoatation: 0, largeArcFlag: 0, endPoint: { x: 9.132738501874556, y: 230.50071365940056 } },
    ],
]



*/