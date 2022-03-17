//#region GLOBAL VARIABLES
// list of students in the class
let students = [
    {
        name: "Niccolo Eck",
        group: null
    },
    {
        name: "Daniel Holland",
        group: null
    },
    {
        name: "Jay Moses",
        group: null
    },
    {
        name: "Carlos Castillo",
        group: null
    },
    {
        name: "Ian Nicholas",
        group: null
    },
    {
        name: "Miguel Torre",
        group: null
    },
    {
        name: "Joanna Christian",
        group: null
    },
    {
        name: "Slater McArdle",
        group: null
    },
    {
        name: "Jesse Maraya",
        group: null
    },
    {
        name: "Jo Hill",
        group: null
    },
    {
        name: "Moises G",
        group: null
    },
    {
        name: "Trent Tkachuk",
        group: null
    },
    {
        name: "Roberto Gonzalez",
        group: null
    },
    {
        name: "Antar Martin",
        group: null
    },
    {
        name: "Lee Anne Sigua",
        group: null
    },{
        name: "Christian Le",
        group: null
    },
    {
        name: "Mitchell Mudgett",
        group: null
    },{
        name: "Isaac Mercado",
        group: null
    },{
        name: "Will Pikus",
        group: null
    },
];
// Create a decoupled copy of students to manipulate in the foreach loop
let available_students = JSON.parse(JSON.stringify(students));
// global incrementing veriables
let group_number = 1;
let max_group_number = 1;
// Set the desired group size
const group_size = 3;
//#endregion

// assign a random teammate to the selected group
const assignTeammate = (group_number) => {
    const teammate_available_index = Math.floor(Math.random() * (available_students.length - 1));
    const teammate = available_students[teammate_available_index];
    const teammate_index = students.findIndex(element => element.name == teammate.name);
    students[teammate_index].group = group_number;
    available_students.splice(teammate_available_index, 1);
};

// loop through all of the students and assign them into groups of 3
students.forEach ((student) => {
    // ensure the student hasn't been assigned a group yet, and there's at least 3 students still unassigned
    if (student.group == null && available_students.length >= group_size) {
        // add the group number to the student and reove them from the available students list
        let student_index = students.findIndex(element => element.name == student.name);
        // jump over this student if they can't be found
        if (student_index == -1) {return;}
        // Assign the student to a group and remove them from the unassigned students
        students[student_index].group = group_number;
        available_students.shift();
        // assign as many teammates as needed to reach the group size
        for (let i = 1; i < group_size; i++) {
            assignTeammate(group_number);
        }
        group_number++;
        max_group_number++;
    }
    // assign the remaining students to existing teams if there's not an even set of threes
    else if (student.group == null && available_students.length > 0) {
        available_students.shift();
        // get a random group number and ensure it can't be zero.
        group_number = Math.floor(Math.random() * (max_group_number - 1)) + 1;
        student.group = group_number;
    }
});

// CREDIT TO: robmathers https://gist.github.com/robmathers/1830ce09695f759bf2c4df15c29dd22d
let groupBy = (data, key) => { // `data` is an array of objects, `key` is the key (or property accessor) to group by
    // reduce runs this anonymous function on each element of `data` (the `item` parameter,
    // returning the `storage` parameter at the end
    return data.reduce((storage, item) => {
      // get the first instance of the key by which we're grouping
      let group = item[key];
      
      // set `storage` for this instance of group to the outer scope (if not empty) or initialize it
      storage[group] = storage[group] || [];
      
      // add this item to its group within `storage`
      storage[group].push(item);
      
      // return the updated storage to the reduce function, which will then loop through the next 
      return storage; 
    }, {}); // {} is the initial value of the storage
};

//   group the students together by group number
const grouped_students = groupBy(students, "group");
//   print te result
console.log(grouped_students);