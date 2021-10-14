// Course constructor
class Course {
    constructor(title, instructor, image) {
        this.id = Date.now(); // unique bir id oluşturmak için
        this.title = title;
        this.instructor = instructor;
        this.image = image;
    }
}

//UI constructor
class UI {
    constructor() {
    }
    addCourseToList(course) {
        const list = document.getElementById("course-list");
        //tabloyu html olarak hazırla
        var html = `
        <tr>
            <td><img src="img/${course.image}" alt="${course.image}"/></td>
            <td>${course.title}</td>
            <td>${course.instructor}</td>
            <td><a class="btn btn-danger btn-sm delete" data-id="${course.id}"">Delete</a></td>
        </tr>
    `;
        
        list.innerHTML += html;
    }
    clearControls() { //inputları boşalt
        const title = document.getElementById("title").value = "";
        const instructor = document.getElementById("instructor").value = "";
        const image = document.getElementById("image").value = "";
    }
    deleteCourse(element) {
        if (element.classList.contains("delete")) { // eğer gelen element delete classını içeriyorsa
            element.parentElement.parentElement.remove(); // bu elementin iki üst atasını kaldır = tr
            return true; // işlem sonrası bilerek true döndürdük. Bunu Delete butonuna basınca kullanacağız.
        }
        
    }
    showAlert(message, className) { // bootstrap alert için method yazdık.

        let alert = `<div class="alert alert-${className}">
                ${message}
                </div> 
                `;
        const row = document.querySelector(".row");
        row.insertAdjacentHTML("afterbegin", alert); // alert div'ini row'un hemen başına ekle

        setTimeout(() => { // 3 saniye sonra alert divini kaldır.
            document.querySelector(".alert").remove();
        }, 3000);
    }
}

//Storage constructor
class Storage{
    static getCourses(){

        let courses; // LS'de verileri array olarak tutacağım.

        if(localStorage.getItem("courses") === null){ // LS'de veri yoksa boş array ata.
            courses = [];   
        }else{
            courses = JSON.parse(localStorage.getItem("courses")); //JSON string'inden JSON objesine çevirme
        }
        return courses;
    }

    static displayCourses(){

        const courses = Storage.getCourses(); 

        courses.forEach(course => {
            const ui = new UI();
            ui.addCourseToList(course); //LS'de olan herbir elemanı UI'da göster
        });        
    }

    static addCourse(course){ //kursu lokal storage'a ekleme 

        const courses = Storage.getCourses(); // LS'den verileri al. Boş da olabilir.
        courses.push(course); // olan verinin üzerine eklenen kursu kaydet. yeni array elementi olarak
        localStorage.setItem("courses",JSON.stringify(courses)); //LS'e kaydetme.
    }

    static deleteCourse(element){//kursu lokal storage'dan silme 
        if(element.classList.contains("delete")){

            const id = element.getAttribute("data-id"); // gelen elementin data-id attributenda bulunan id'yi al.
            const courses = Storage.getCourses(); // LS'i getir
            const filtered = courses.filter(item=>item.id != id); //gelen id'ye göre filtrele. Kalanı bırak.
            localStorage.setItem("courses",JSON.stringify(filtered)) // kalanları tekrar LS'e gönder
        }
    }
}

const form = document.getElementById("new-course");
const button = document.getElementById("button");

//dom yüklendiğinde lokal storageda yer alan verileri yazdırma. Sayfa yenilendiğinde veya ilk açıldığında
document.addEventListener("DOMContentLoaded", Storage.displayCourses());

form.addEventListener("submit", function(e){ // form submit olduğunda

    const title = document.getElementById("title").value;
    const instructor = document.getElementById("instructor").value;
    const image = document.getElementById("image").value;

    // Kurs objesinin input değerleri ile oluşturulması
    const course = new Course(title,instructor,image);
    
    //create UI
    const ui = new UI();

    if(title === "" || instructor === "" || image === ""){
        ui.showAlert("Please fill the form", "warning");
    }else{
        // add course to list
        ui.addCourseToList(course);

        //save to LS
        Storage.addCourse(course);

        //clear controls
        ui.clearControls();

        ui.showAlert("Course has been added", "success")
    }

    e.preventDefault(); // submit sonrası sayfa refresh olmasın diye.
})

document.getElementById("course-list").addEventListener("click", function(e){

    const ui = new UI();

    //delete course
    if(ui.deleteCourse(e.target) == true){
        //delete course from LS
        Storage.deleteCourse(e.target);
        ui.showAlert("The course has been deleted", "danger")
    }
})






