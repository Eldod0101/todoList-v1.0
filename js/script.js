// Variables
let tasks = [];
let tasksDone = [];
let input = document.getElementById('input');
let add = document.getElementById('add');
let deleteAll = document.getElementById('deleteAll');
let outputs = document.getElementById('outputs');
let deleteBtn = document.getElementById('delete');
let editBtn = document.getElementById('edit');
let Unfinished = document.getElementById('finishedTasks');
// Functions


window.onload = function() {
    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    if (localStorage.getItem('tasksDone')) {
        tasksDone = JSON.parse(localStorage.getItem('tasksDone'));
    }
    showData();
    ShowFinishedData();
}


add.onclick = function() {
    if (input.value !== '') { // تأكد أن المستخدم أدخل قيمة
        let taskData = {
            title: input.value, // العنوان هو القيمة المدخلة
            isDone: false // المهمة جديدة لذلك لم تُنجز بعد
        };
        tasks.push(taskData); // أضف المهمة إلى القائمة
        localStorage.setItem('tasks', JSON.stringify(tasks)); // خزنها في localStorage
        input.value = ''; // إعادة تعيين الحقل
        showData(); // عرض البيانات
    } else {
        alert('Please write something');
    }
}


function showData() {
    let taskOutput = '';
    for (let i = 0; i < tasks.length; i++) {
        taskOutput += `
        <div class="task">
            <h2>${tasks[i].title}</h2>  <!-- استخدام title من الكائن -->
            <div class="taskButtons">
                <button onclick="Done(${i})" id="done">Done</button>
                <button onclick="deleteTask(${i})" id="delete">Delete</button>
                <button onclick="editTask(${i})" id="edit">Edit</button>
            </div>
        </div>`;
    }
    outputs.innerHTML = taskOutput; // تحديث DOM
}

showData();


function deleteTask(i) {
    tasks.splice(i, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showData();
}

function editTask(i) {
    input.value = tasks[i].title; // احصل على العنوان فقط
    tasks.splice(i, 1); // احذف المهمة القديمة
    localStorage.setItem('tasks', JSON.stringify(tasks)); // تحديث التخزين المحلي
    showData(); // تحديث العرض
}


// when i click on Done button it will be show in .Finished class
function Done(i) {
    tasksDone.push(tasks[i]);
    tasks.splice(i, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('tasksDone', JSON.stringify(tasksDone));
    showData();
    ShowFinishedData(); // تأكد من عرض المهام المنجزة بعد كل تحديث
}


function ShowFinishedData() {
    let finishedTasksOutput = '';
    for (let i = 0; i < tasksDone.length; i++) {
        finishedTasksOutput += `
        <div class="task">
            <h2>${tasksDone[i].title}</h2>  <!-- استخدام title من الكائن -->
            <div class="taskButtons">
                <button onclick="deleteTaskDone(${i})" id="delete">Delete</button>
            </div>
        </div>`;
    }
    Unfinished.innerHTML = finishedTasksOutput; // تحديث DOM
}


ShowFinishedData()

function deleteTaskDone(i) {
    tasksDone.splice(i, 1);
    localStorage.setItem('tasksDone', JSON.stringify(tasksDone));
    ShowFinishedData();
}