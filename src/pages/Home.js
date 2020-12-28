import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Button, Modal, ModalBody, ModalFooter} from "reactstrap";
import Lottie from "react-lottie";
import DoneLottie from "../json/done.json";
import {
  faTimesCircle,
  faPenSquare,
  faCheckCircle,
  faTools,
  faArrowAltCircleLeft,
  faTrash
} from "@fortawesome/free-solid-svg-icons";

// Variables for the alert of bootstrap
var alertMessage;
var alertClass;

// Lottie Options
const defaultOptions = {
  loop:false,
  autoplay:false,
  rendererSettings:{
    preserveAspectRadio: "xMidYmid slice"
  },
  animationData: DoneLottie
}

//  Lottie Styles
const lottieStyle = {
  position:"absolute",
  top:"50%",
  left:"50%",
  height: "200px",
  width: "200px",
  cursor: "inherit",
  transform: "translateX(-50%) translateY(-50%)",
  pointerEvents:"none"

}

export default class Home extends Component {


  state = {
    email: localStorage.getItem("email"),
    inputHidden: true,
    inputEmailHidden: false,
    updatedMessageHidden: true,
    deniedMessageHidden: true,
    membership: this.props.SUBSCRIPTION,
    theme: localStorage.getItem("theme"),
    modal:false,
    isStopped: true,
  };

  componentDidMount() {

    // Validating local storage variables and assign it default values if its empty
    let localEmail = localStorage.getItem("email");
    let localTheme = localStorage.getItem("theme");
    let localLanguage = localStorage.getItem("language");

    if(localEmail === null) {
      localStorage.setItem("email",  this.props.user.user_email)
    }
    if(localTheme === null) {
      localStorage.setItem("theme", "default"); 
    }
    
    if(localLanguage === null) {
      localStorage.setItem("language", "es"); 
    }
    
    localEmail = localStorage.getItem("email");
    localTheme = localStorage.getItem("theme");
    localLanguage = localStorage.getItem("language");
    // ------
    

  // Declaring variables
    let bannerMessageContainer = document.getElementById("banner-message");
    let body = document.getElementsByTagName("body");
    let timezone = document.querySelectorAll(".timezone");
    let currentDate = document.getElementById("current-date")
    // ---


    // Creating the banner message text and animating it
    let text = "Welcome to Mr X's website";
    let textArray = text.split("");
    textArray.forEach((i, index) => {
      let p = document.createElement("h3");
      p.classList.add("ptag");
      let text = document.createTextNode(i);
      p.appendChild(text);
      p.style.animationDelay = `${index / 10}s`;
      bannerMessageContainer.appendChild(p);
    });
    // ---


    let ptag = document.querySelectorAll(".ptag");

    // Putting the color of the animation an the time zone depending in the theme selected
    if(localTheme === "default") {
     ptag.forEach(e => {
       e.style.color = "black";
     })
    } else {

      currentDate.style.color = "white";

      timezone.forEach(e => {
        e.style.color = "white";
      })

      ptag.forEach(e => {
        e.style.color = "white";
      })
    }
    // ---

    // Animating the user image on mousemove
    body[0].addEventListener("mouseover", (e) => {
      let imgElement = document.getElementById("image");
      let xAxis = e.screenX / 100;
      let yAxis = e.screenY / 100;
      imgElement.style.transition = "none";
      imgElement.style.transform = `translateY(${yAxis}px) translateX(${xAxis}px)`;
    });
    // ---

    // Adding theme thas the user has in the local storage
    body[0].classList.add(localTheme);

  }

  // Adding a clock to the page
  currentDate = () => {
  
    setInterval(() => {
      let currentDate = new Date();
      let p = document.getElementById("current-date");
      let currentDateString = `${currentDate.getHours().toString()}:${currentDate.getMinutes().toString()}:${currentDate.getSeconds().toString()}`
      p.classList.add("timezone");
      p.innerHTML = currentDateString;
    }, 1000);


  };

  // OnkeyDown updating values
  updateEmail = (e) => {
    let emailValue = document.getElementById("email").value

      // Updting email state
      localStorage.setItem("tempMail",emailValue);
      // ---
  };

  // Send the info when the user clicks in the check button or press Enter
  SendUpdatedEmail = (e) => {

    let editIcon = document.querySelector(".edit");
    editIcon.classList.remove("d-none");


    let tempMail = localStorage.getItem("tempMail")

    let emailValue = document.getElementById("email").value

    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        tempMail
      )
    ) {
      

      localStorage.setItem("email",emailValue);

      this.setState({ 
        inputHidden: true,
        inputEmailHidden:false,
        updatedMessageHidden: false 
      });
      

      setTimeout(() => {
        this.setState({ updatedMessageHidden: true });
      }, 2000);

      alertMessage = "Your email was updated successfully";
      alertClass = "success";
      return alertMessage + alertClass;
    } else {
      this.setState({ updatedMessageHidden: false });
      setTimeout(() => {
        this.setState({ updatedMessageHidden: true });
      }, 2000);

      alertMessage = "You entered an invalid email";
      alertClass = "danger";
      e.preventDefault();
      return alertMessage + alertClass;
    }

  };


  //Show input when the user clicks in the Edit button
  showInput = (e) => {
    this.setState({inputHidden: false, inputEmailHidden:true });
    let editIcon = document.querySelector(".edit");

    editIcon.classList.add("d-none");

    let localEmail = localStorage.getItem("email")

    if(localEmail !== null) {
      localStorage.setItem("tempMail", localEmail);
    }

    let inputContainer = document.querySelector(".input-container");
    let iconContainer = document.querySelector(".icon-container");

    if(window.innerWidth < 325) {
      inputContainer.classList.add("flex-wrap");
      iconContainer.classList.add("mt-3");
    }
    
  };

//Hide input when the user clicks in the Edit button
  cancelEditing = () => {

    let editIcon = document.querySelector(".edit");

    editIcon.classList.remove("d-none")
    
    let emailInput = document.getElementById("email");
    emailInput.value = localStorage.getItem("email")
    let email = this.props.user.user_email;
    this.setState({email: email, inputHidden: true, inputEmailHidden:false });

    let inputContainer = document.querySelector(".input-container");
    let iconContainer = document.querySelector(".icon-container");

    if(window.innerWidth < 325) {
      inputContainer.classList.remove("flex-wrap");
      iconContainer.classList.remove("mt-3");
    }

  };


  // Turn 180 Degrees the front-face div when the user clicks in the "Advanced Settings" button
  turn1 = () => {
    let frontFace = document.getElementsByClassName("front-face");
    let backFace = document.getElementsByClassName("back-face");
    frontFace[0].style.transform = "rotateY(180deg)";
    backFace[0].style.transform = "rotateY(360deg)";
  }

  // Turn 0 Degrees the front-face div when the user clicks in the "Go-Back" button
  turn2 = () => {
    let frontFace = document.getElementsByClassName("front-face");
    let backFace = document.getElementsByClassName("back-face");
    frontFace[0].style.transform = "rotateY(0deg)";
    backFace[0].style.transform = "rotateY(180deg)";
  }

  // Setting respective styles when user changes style
  putTheme = (e) => {

    let ptag = document.querySelectorAll(".ptag");
    let body = document.getElementsByTagName("body");
    let timezone = document.querySelectorAll(".timezone");
    localStorage.setItem("theme", e.target.value)

    body[0].removeAttribute("class");

    if(e.target.value === "default") {

      timezone.forEach((e) => {
        e.style.color = "black"
      })

      body[0].classList.add(e.target.value);
      
      ptag.forEach(e => {
        e.style.color = "black";
      })

    } else {

      timezone.forEach((e) => {
        e.style.color = "white"
      })

      body[0].classList.add(e.target.value);

      ptag.forEach(e => {
        e.style.color = "white";
      })
    }

  }

  //Adding a selected input depengings on the user localStorage
  selectedTheme = (e) => {
    if(e.value === this.state.theme) {
      return true;
    }
  }

  //Adding a selected input depengings on the user localStorage
  selectedLanguage = (e) => {
    if(e.code === localStorage.getItem("language")) {
      return true;
    }
  }

  
  putLanguage = (e) => {
    localStorage.setItem("language",e.target.value);
    document.getElementById("language-code").innerHTML = `[${e.target.value}]`
  }

  textMuted = (i,index) => {

    // Free Subscription
    if(this.props.user.SUBSCRIPTION === "free") {

      if(index > 1) {
        return "text-muted";
      } 

    } 
    // ---

      // Basic Subscription
      if(this.props.user.SUBSCRIPTION === "basic") {

        if(index > 3) {
          return "text-muted";
        } 
  
      } 
      // ---

       // Premium Subscription
       if(this.props.user.SUBSCRIPTION === "premium") {

        if(index > 5) {
          return "text-muted";
        } 
  
      } 
      // ---

    
  }

  checked = (i,index) => {

      // Free Subscription
      if(this.props.user.SUBSCRIPTION === "free") {

        if(index < 2) {
          return true;
        } else {
          return false
        }
      }
      // ---

      // Basic Subscription
      if(this.props.user.SUBSCRIPTION === "basic") {

        if(index < 4) {
          return true;
        } else {
          return false
        }
      }
      // ---

       // Premium Subscription
       if(this.props.user.SUBSCRIPTION === "premium") {

        if(index < 6) {
          return true;
        } else {
          return false
        }
      }
      // ---


  }

  disabled = (i,index) => {

    // Free Subscription
    if(this.props.user.SUBSCRIPTION === "free") {

      if(index > 1) {
        return true;
      } else {
        return false
      }
    }
    // ---

    // Basic Subscription
    if(this.props.user.SUBSCRIPTION === "basic") {

      if(index > 3) {
        return true;
      } else {
        return false
      }
    }
    // ---

    // Premium Subscription
    if(this.props.user.SUBSCRIPTION === "premium") {

      if(index > 5) {
        return true;
      } else {
        return false
      }
    }
    // ---

  }

  deleteStorage = () => {
    this.setState({modal:false,isStopped:false})
      localStorage.clear();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
  }


  render() {

    let features = this.props.user.ENABLED_FEATURES
    let email = localStorage.getItem("email")
    let subscriptions = this.props.subscriptions;
    let themes = this.props.user.theme_name;
    let user = this.props.user;

    let creationDate = new Date(this.props.user.CREATION_DATE);
    let completeCreationDate = `${creationDate
      .getFullYear()
      .toString()}/${creationDate
      .getMonth()
      .toString()}/${creationDate
      .getDate()
      .toString()}  ${creationDate.getHours()}:${creationDate.getMinutes()}`;

    let lastPaymentDate = new Date(this.props.user.LAST_PAYMENT_DATE);
    let completeLastPaymentDate = `${lastPaymentDate
      .getFullYear()
      .toString()}/${lastPaymentDate
      .getMonth()
      .toString()}/${lastPaymentDate
      .getDate()
      .toString()}  ${lastPaymentDate.getHours()}:${lastPaymentDate.getMinutes()}`;

    return (
      <React.Fragment>
        <div
          id="banner-message"
          className="container d-flex align-items-center justify-content-center"
        ></div>

        <div
          id="profile"
          onMouseOver={this.onMouseHover}
          onMouseOut={this.onMouseOut}
          className="container mt-5 d-flex align-items-start justify-content-start flex-wrap"
        >
          {/* Image Section */}
          <div className="col-12 col-md-6 col-lg-6 col-xl-6 image-profile-container d-flex align-items-center justify-content-center">
            <img
              id="image"
              className={user.SUBSCRIPTION}
              src={user.user_profile_image}
              alt="Barack"
            />
          </div>

          {/* Information Section */}
          <div
            id="profile-container"
            className="col-12 col-md-6 col-lg-6 col-xl-6 d-flex align-items-start justify-content-center"
          >

            {/* Front face */}
            <div className="front-face col-12 mt-5 mt-md-0 mt-lg-0 mt-xl-0">

              <div className="d-flex align-items-center justify-content-between col-12">
                <h3 className="my-3 text-center"> Your profile </h3>
                <FontAwesomeIcon
                  title="Advanced Settings"
                  className={`config-icon ${this.props.user.SUBSCRIPTION}`}
                  icon={faTools}
                  onClick={this.turn1}
                />
              </div>
  
              <div className="info-div d-flex flex-column align-items-start justify-content-between">
                <h6 className="display-inline-block"> Email:</h6>
  
                <div className="input-container d-flex align-items-center justify-content-center">
                  <p id="emailp" hidden={this.state.inputEmailHidden}> {email || this.props.user.user_email} </p>
                  <input
                    id="email"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        this.SendUpdatedEmail(e);
                      }
                      if (e.key === "Escape") {
                        this.cancelEditing(e);
                      }
                    }}
                    onKeyUp={this.updateEmail}
                    type="email"
                    disabled={this.state.inputHidden}
                    className="form-control w-auto"
                    autoComplete="off"
                    hidden={this.state.inputHidden}
                    defaultValue={localStorage.getItem("email") || this.props.user.user_email}
                  />
  
                  <div className="icon-container ml-3">
                    {/* Ex */}
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      onClick={this.cancelEditing}
                      hidden={this.state.inputHidden}
                      className="icon cancel "
                      title="Cancel"
                      alt="Cancel"
                    />
                    {/* Check */}
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      onClick={this.SendUpdatedEmail}
                      hidden={this.state.inputHidden}
                      className="icon accept"
                      title="Accept"
                      alt="Accept"
                    />
  
                    {/* Edit */}
                    <FontAwesomeIcon
                      icon={faPenSquare}
                      onClick={this.showInput}
                      className="icon edit"
                      title="Edit"
                      alt="edit-icon"
                    />
                  </div>
                </div>
              </div>
  
              {/* Alert */}
              <div className={`alert alert-${alertClass}`}
                hidden={this.state.updatedMessageHidden}
                role="alert"
              >
                {alertMessage}
              </div>
  
              {/* Last Payment Date */}
              <div className="info-div d-flex flex-column align-items-start justify-content-center">
                <h6 className="display-inline-block mb-1"> Last payment date:</h6>
                <time dateTime={user.LAST_PAYMENT_DATE}>
                  <p> {completeLastPaymentDate} </p>{" "}
                </time>
              </div>
  
              {/* Creation Date */}
              <div className="info-div d-flex flex-column align-items-start justify-content-center">
                <h6 className="display-inline-block mb-1"> Creation date:</h6>
                <time dateTime={user.CREATION_DATE}>
                  <p> {completeCreationDate} </p>{" "}
                </time>
              </div>

               {/* Select your language */}
               <div className="info-div d-flex flex-column align-items-start justify-content-center">
                  <h6 className="display-inline-block mb-1">
                    Select your language
                  </h6>
                  <select
                    onChange={this.putLanguage}
                    className="form-control col-12 col-md-6 col-lg-6 col-xl-6 text-capitalize"
                  >
                  {this.props.user.language.map((i) => {
                    return (
                      <option  
                        value={i.code} 
                        key={i.code} 
                        className="text-capitalize"
                        selected={this.selectedLanguage(i)}
                        > 
                        {i.name} 
                      </option>
                    );
                  })}
                  </select>
                </div>
  
             

            </div>


            {/* Back Face */}
            <div className="back-face col-12 mt-5 mt-md-0 mt-lg-0 mt-xl-0">
              <div className="d-flex align-items-center justify-content-left col-12">
                <FontAwesomeIcon
                  title="Go Back"
                  className={`config-icon mr-3 ${this.props.user.SUBSCRIPTION}`}
                  icon={faArrowAltCircleLeft}
                  onClick={this.turn2}
                />
                <h3 className="my-3 text-center"> Advanced Settings </h3>
                <FontAwesomeIcon 
                className="ml-auto config-icon trash" 
                title="Delete Local Storage"
                onClick={()=> this.setState({modal:true})}
                icon={faTrash} />
              </div>
  
                {/* Change Theme */}
                <div className="info-div d-flex flex-column align-items-start justify-content-center">
                  <h6 className="display-inline-block mb-1">
                    Change Theme
                  </h6>
                  <select
                    onChange={this.putTheme}
                    className="form-control col-12 col-md-6 col-lg-6 col-xl-6 text-capitalize"
                  >
                  <option value="default">Default</option>
                  {themes.map((i) => {
                    return (
                      <option  value={i.value} selected={this.selectedTheme(i)} 
                      key={i.value} className="text-capitalize">
                        {i.name}
                      </option>
                    );
                  })}
                  </select>
                </div>

                 {/* Memberships */}
              <div className="info-div d-flex flex-column align-items-start justify-content-center">
                <h6 className="display-inline-block mb-1">
                  Take a look of our memberships:
                </h6>
                <select
                  onChange={(e) =>
                    this.props.changeSubscription(e.target.value) +
                    this.updateText
                  }
                  className="form-control col-12 col-md-6 col-lg-6 col-xl-6 text-capitalize"
                >
                  {subscriptions.map((i) => {
                    return (
                      <option key={i} className="text-capitalize">
                        {i}
                      </option>
                    );
                  })}
                </select>
              </div>

               

                {/* Advanced Options */}
                <div className="info-div d-flex flex-column align-items-start justify-content-center">
                  <h6 className="display-inline-block mb-1">
                    Enabled features
                  </h6>
                 <div className="d-flex align-items-center justify-content-center flex-wrap">
                  
                  {features.map((i,index) => {
                    return(
                        <div className="col-12">
                          <input 
                          id={`chekbox${index}`} 
                          type="checkbox"
                          disabled={this.disabled(i,index)}
                          checked={this.checked(i,index)}
                          readOnly
                          key={i.boolean}
                          >
                          </input>

                          <label className={`labelInput ${this.textMuted(i,index)}`} htmlFor={`chekbox${index}`}> {i.name} </label>
                        </div> 
                    )
                        
                  })}

                 </div>
                </div>

  
            </div>

          

          </div>


          
         {/* Timezone */}

        <div className="d-flex align-items-center justify-content-end container mt-5 mt-md-3 mt-lg-3 mt-xl-3 p-0">
          <p className="timezone"> Timezone: </p>
          <p className="timezone ml-2"> {user.displayed_timezone} </p>
          <p id="language-code" className="timezone ml-2"> [{localStorage.getItem("language") || "en"}] </p>
       </div>

        <div className="d-flex align-items-center justify-content-end col-12 p-0">
          <p className="timezone col-12 d-flex align-items-center justify-content-end container w-100 p-0" id="current-date"> 
            {this.currentDate()} 
          </p>
        </div>



        </div>


        <Lottie style={lottieStyle} isStopped={this.state.isStopped} options={defaultOptions} />

       


        <Modal className="modal-dialog modal-dialog-centered" isOpen={this.state.modal}>

          <ModalBody> 
            <h5 className="text-center">Are you sure that you want to delete the Local Storage?
            </h5> 
            <p className="text-center"> *This action will reload the page* </p>

          </ModalBody>

          <ModalFooter className="d-flex align-items-center justify-content-center"> 

            <Button onClick={this.deleteStorage} className="btn-success"> 
              Sure! 😊
            </Button>

            <Button onClick={() => this.setState({modal:false})} className="btn-danger"> 
              No! 😱
            </Button>

          </ModalFooter>

        </Modal>




      </React.Fragment>
    );
  }
}
