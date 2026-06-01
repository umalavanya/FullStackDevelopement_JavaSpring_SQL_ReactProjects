const employees = [
 { id: 1, name: 'A', salary: 10000 },
 { id: 2, name: 'B', salary: 25000 },
 { id: 3, name: 'C', salary: 18000 },
 { id: 4, name: 'D', salary: 35000 }
];

const topEarners = employees.filter(employee => employee.salary > 15000)
                                .sort((a,b) =>  (b.salary-a.salary)) ;

console.log(topEarners) ;
