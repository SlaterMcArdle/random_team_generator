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

// loop through all of the students and assign them into groups of 3
students.forEach ((student) => {
    // ensure the student hasn't been assigned a group yet, and there's at least 3 students still unassigned
    if (student.group == null && available_students.length >= 3) {
        // add the group number to the student and reove them from the available students list
        let student_index = students.findIndex(element => element.name == student.name);
        // ensure the student can be found in the students list
        if (student_index != -1) {
            // Assign the student to a group and remove them from the unassigned students
            students[student_index].group = group_number;
            available_students.shift();
            // Do the same for the randomly selected first team mate
            let teammate_1_available_index = Math.floor(Math.random() * (available_students.length - 1));
            let teammate_1 = available_students[teammate_1_available_index];
            let teammate_1_index = students.findIndex(element => element.name == teammate_1.name);
            students[teammate_1_index].group = group_number;
            available_students.splice(teammate_1_available_index, 1);
            // The same again for the second team mate
            let teammate_2_available_index = Math.floor(Math.random() * (available_students.length - 1));
            let teammate_2 = available_students[teammate_2_available_index];
            let teammate_2_index = students.findIndex(element => element.name == teammate_2.name);
            students[teammate_2_index].group = group_number;
            available_students.splice(teammate_2_available_index, 1);
            // increment the group number and max group number
            group_number++;
            max_group_number++;
        }
    }
    // assign the remaining students to existing teams if there's not an even set of threes
    else if (student.group == null && available_students.length > 0) {
        available_students.shift();
        // get a random group number and ensure it can't be zero.
        group_number = Math.floor(Math.random() * max_group_number - 1) + 1;
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

