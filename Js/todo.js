export function todoList() {
    var currentTask = []
    if (localStorage.getItem('currentTask')) {
        currentTask = JSON.parse(localStorage.getItem('currentTask'))
    } else {
        console.log('Task List is Empty')
    }

    function renderTask() {
        var allTask = document.querySelector('.allTask')
        var sum = ''

        currentTask.forEach(function (elem, idx) {
            sum += `
        <div class="task">
            <div id='task-det'><h5>${elem.task} <span class="${elem.imp}"><i class="ri-bookmark-3-fill"></i></span></h5>
            <details>
                <summary>Task Details</summary>
                <p>${elem.details}</p>
            </details></div>

            <div id="markdelete">
                <button class="markBtn" data-id="${idx}" ${elem.completed ? 'disabled' : ''}>
                    ${elem.completed ? 'Completed' : 'Mark as Completed'}
                </button>

                <i class="ri-delete-bin-7-fill"
                   data-id="${idx}"
                   style="display:${elem.completed ? 'inline-block' : 'none'}">
                </i>
            </div>
        </div>`
        })

        allTask.innerHTML = sum
        localStorage.setItem('currentTask', JSON.stringify(currentTask))

        var markCompletedBtn = document.querySelectorAll('.markBtn')
        markCompletedBtn.forEach(function (btn) {
            btn.addEventListener('click', function () {
                let id = btn.dataset.id
                currentTask[id].completed = true
                renderTask()
            })
        })

        var deleteIcons = document.querySelectorAll('.ri-delete-bin-7-fill')
        deleteIcons.forEach(function (icon) {
            icon.addEventListener('click', function () {
                let id = icon.dataset.id
                currentTask.splice(id, 1)
                renderTask()
            })
        })
    }

    renderTask()


    let form = document.querySelector('.addTask form')
    let taskInput = document.querySelector('.addTask form input')
    let taskDetailInput = document.querySelector('.addTask form textarea')
    let taskCheckbox = document.querySelector('.addTask form #check')

    form.addEventListener('submit', function (e) {
        e.preventDefault()

        currentTask.push({
            task: taskInput.value,
            details: taskDetailInput.value,
            imp: taskCheckbox.checked,
            completed: false
        })

        taskInput.value = ''
        taskDetailInput.value = ''
        taskCheckbox.checked = false

        renderTask()
    })
}