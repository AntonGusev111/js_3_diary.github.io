import  checkInputCoord  from './check';

class Diary{
  constructor(){
    this.modal = document.querySelector('.modal');
    this.input = document.querySelector('.input_area');
  }

  listener(){
    this.modal.addEventListener('click', (e)=>{
      if(e.target.innerText == 'Ок'){
        //e.preventDefault();
        const coords = document.querySelector('.coords');
        if(checkInputCoord(coords.value)){
          e.preventDefault();
          this.createPost(this.input.value, coords.value.split(','));
          this.modal.classList.add('fog')
        } else{
            coords.setCustomValidity("Введите ваши координаты в верном формате 51.50851, −0.12572");
          };
      } if (e.target.innerText == 'Отмена') {
        e.preventDefault();
        this.modal.classList.add('fog')
      }
    }); //51.50851,−0.12572

    document.addEventListener('keydown', (e)=>{
      if(e.key =='Enter' && this.input.value.length > 2){
        const value = this.input.value;
        this.getGeoData(value);
      };
    });

  }

  getGeoData(value){
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition((coords)=>{
        const { latitude,longitude } = coords.coords;
        this.createPost(value, [latitude, longitude]);
      }, (error)=>{
        this.modal.classList.remove('fog')
      },{ enableHighAccuracy: true });
    }
  }

  createPost(value, coords){
    let post = document.createElement('div');
    const body = document.querySelector('body');
    post.classList.add('post');
    post.innerHTML = `<div class="content">
    <div class="post_body">${value}</div>
    <div class="post_date">${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}</div>
  </div>
  <div class="cord_place">
    <div class="cord">[${coords[0]}, ${coords[1]}]</div>
    <div class="eye_div"></div>
  </div>`
    body.prepend(post);
    this.input.value='';
    
  };

  
};



let diary = new Diary();
diary.listener();




