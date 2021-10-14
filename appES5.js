// Course constructor
function Course(title, instructor, image){
    this.title = title;
    this.instructor = instructor;
    this.image = image;
}

//UI constructor
function UI(){

}

UI.prototype.addCourseToList = function(course){
    const list = document.getElementById("course-list");
    var html = `
        <tr>
            <td><img src="img/${course.image}" alt="${course.image}"/></td>
            <td>${course.title}</td>
            <td>${course.instructor}</td>
            <td><a class="btn btn-danger btn-sm delete">Delete</a></td>
        </tr>
    `;
    list.innerHTML += html; 
}

UI.prototype.clearControls = function(){
    const title = document.getElementById("title").value = "";
    const instructor = document.getElementById("instructor").value = "";
    const image = document.getElementById("image").value = "";
}

UI.prototype.deleteCourse = function(element){
    if(element.classList.contains("delete")){
        element.parentElement.parentElement.remove();
    }
}

UI.prototype.showAlert = function(message,className){

    let alert = `<div class="alert alert-${className}">
                ${message}
                </div> 
                `;
    const row = document.querySelector(".row");
    row.insertAdjacentHTML("afterbegin", alert);

    setTimeout(()=>{
        document.querySelector(".alert").remove()
    },3000)
}

const form = document.getElementById("new-course");
const button = document.getElementById("button");

form.addEventListener("submit", function(e){

    const title = document.getElementById("title").value;
    const instructor = document.getElementById("instructor").value;
    const image = document.getElementById("image").value;

    // Kurs objesinin oluşturulması
    const course = new Course(title,instructor,image);
    
    //create UI
    const ui = new UI();

    if(title === "" || instructor === "" || image === ""){
        ui.showAlert("Please fill the form", "warning");
    }else{
        // add course to list
        ui.addCourseToList(course);

        //clear controls
        ui.clearControls();

        ui.showAlert("Course has been added", "success")
    }

    e.preventDefault();
})

document.getElementById("course-list").addEventListener("click", function(e){
    const ui = new UI();
    ui.deleteCourse(e.target)

    ui.showAlert("The course has been deleted", "danger")
})






