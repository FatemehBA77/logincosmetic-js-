import forgetPassword from "/asset/pages/forgetpass.js";
import signIn from "/asset/pages/signin.js";
import logIn from "/asset/pages/login.js";
const body = document.querySelector("body");
// btnSubmit.addEventListener("click", () => {
//   let resultEmail = false;
//   let resultPassword = false;
//   if (!userInput.value && !emailInput.value && !passInput.value) {
//     alert("your form is empty , please fill it");
//     return;
//   } else if (!userInput.value) {
//     alert("please fill username");
//     return;
//   } else if (!emailInput.value) {
//     alert("please fill email");
//     return;
//   } else if (!passInput.value) {
//     alert("please fill password");
//     return;
//   }
//   if (emailInput.value) {
//     if (passInput.value) {
//       resultEmail = checkemail();
//       resultPassword = checkPassword(passInput.value);
//       if (resultPassword && resultEmail) {
//         saveItems();
//         return;
//       }
//     }
//   }
//   if (
//     userInput.value &&
//     emailInput.value &&
//     resultEmail &&
//     resultPassword &&
//     passInput.value
//   ) {
//     saveItems();
//   }
// });
function checkemail(email) {
  let testresults = false;
  let str = email;
  let filter =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  if (filter.test(str)) testresults = true;
  else {
    alert("Please input a valid email address!");
    testresults = false;
  }
  return testresults;
}
function saveItems(userInput, emailInput, passInput) {
  if (userInput && emailInput && checkemail(emailInput) && passInput) {
    console.log(userInput, " ", emailInput, " ", passInput);
    const email = emailInput;
    const userN = userInput;
    const pass = passInput;
    let user = {
      user: userN,
      email: email,
      pass: pass,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      isChanged: false,
    };
    const savedUsers = getAllUsers();
    existUsers(userN, email, pass, user);
  }
}
function existUsers(user, email, pass, newUser) {
  const users = getAllUsers();
  let userResult = users.find((u) => u.user === user);
  let emailResult = users.find((u) => u.email === email);
  if (!userResult && !emailResult) {
    saveUser(newUser);
    email = "";
    user = "";
    pass = "";
    alert("your information regestred , welcome to my page");
  } else {
    email = "";
    user = "";
    pass = "";
    alert("username or password is wrong...");
  }
}
function getAllUsers() {
  const savedUsers = JSON.parse(localStorage.getItem("infoUsers")) || [];
  return savedUsers;
}
function saveUser(user) {
  const savedUsers = getAllUsers();
  const existMail = savedUsers.find((u) => u.email === user.email);
  if (existMail) {
    existMail.pass = user.pass;
    existMail.isChanged = true;
  } else {
    savedUsers.push(user);
  }
  localStorage.setItem("infoUsers", JSON.stringify(savedUsers));
  return savedUsers;
}
function saveAllUsers(users) {
  localStorage.setItem("infoUsers", JSON.stringify(users));
}
function checkPassword(password) {
  const passw = /^[A-Za-z]\w{7,14}$/;
  if (password.match(passw)) {
    alert("Correct password");
    return true;
  } else {
    alert("Wrong password...!");
    return false;
  }
}

function router(params) {
  const routers = [
    {
      path: "/public/forget-password",
      view: forgetPassword,
    },
    {
      path: "/public/",
      view: signIn,
    },
    {
      path: "/public/login",
      view: logIn,
    },
  ];
  const potentioalRuters = routers.map((item) => {
    return {
      route: item,
      isMatch: location.pathname === item.path,
    };
  });
  let match = potentioalRuters.find((route) => route.isMatch);
  if (!match) {
    match = {
      route: {
        path: "/not-found",
        view: () => console.log("not found page"),
      },
      isMatch: true,
    };
  }
  body.innerHTML = match.route.view();
  if (location.pathname === "/public/") {
    const userInput = document.querySelector("#uername");
    const emailInput = document.querySelector("#email");
    const passInput = document.querySelector("#password");
    const btnSubmit = document.querySelector("#btn-submit");
    btnSubmit.addEventListener("click", () => {
      let resultEmail = false;
      let resultPassword = false;
      if (!userInput.value && !emailInput.value && !passInput.value)
        alert("your form is empty , please fill it");
      else if (!userInput.value) alert("please fill username");
      else if (!emailInput.value) alert("please fill email");
      else if (!passInput.value) alert("please fill password");
      if (emailInput.value) {
        if (passInput.value) {
          resultEmail = checkemail(emailInput.value);
          resultPassword = checkPassword(passInput.value);
          if (resultPassword && resultEmail) {
            saveItems(userInput.value, emailInput.value, passInput.value);
            return;
          }
        }
      }
      if (
        userInput.value &&
        emailInput.value &&
        resultEmail &&
        resultPassword &&
        passInput.value
      ) {
        saveItems(userInput.value, emailInput.value, passInput.value);
      }
    });
  } else if (location.pathname === "/public/forget-password") {
    const btnConfirm = document.querySelector("#btn-confirm");
    const emailInput = document.querySelector("#email");
    btnConfirm.addEventListener("click", (e) => {
      e.preventDefault();
      if (!emailInput.value) alert("enter email");
      else if (emailInput.value) {
        const users = getAllUsers();
        console.log(users);
        let availableUsers = users.find(
          (user) => user.email === emailInput.value
        );
        if (availableUsers) {
          sendEmail(
            emailInput.value,
            availableUsers.user,
            availableUsers.pass,
            availableUsers.id,
            availableUsers.createdAt,
            availableUsers.isChanged
          );
          emailInput.value = "";
          alert("code send your email");
        } else if (!availableUsers) {
          availableUsers.isChanged = false;
          alert("your email is not found");
        }
        return;
      }
    });
  } else if (location.pathname === "/public/login") {
    const loginBtn = document.querySelector("#btn-submit__login");
    const userName = document.querySelector("#uername");
    const password = document.querySelector("#password");
    loginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const users = getAllUsers();
      console.log(users);
      if (userName.value && password.value) {
        const user = users.find((u) => u.user == userName.value);
        if (user) {
          console.log("run user");
          console.log(user);
          if (user.pass == password.value) alert("welcome to my page");
          else alert("your password is incorrect");
        } else alert("you should sign up");
      } else if (userName.value && !password.value) alert("you full passwoprd");
      else if (password.value && !userName.value) alert("you full username");
      else if (!userName.value && !password.value)
        alert("you full username and password");
    });
  }
  // console.log(match.route.view());
}
function sendEmail(email, name, password, id, createdAt, isChanged) {
  let templateParams = {
    name: name,
    email: email,
    message: codeEmail(),
  };
  function codeEmail() {
    let val = Math.floor(1000 + Math.random() * 9000);
    return val;
  }
  password = templateParams.message;
  console.log(password);
  console.log(
    saveUser({
      user: name,
      email: email,
      pass: password,
      id: id,
      createdAt: createdAt,
      isChanged: !isChanged,
    })
  );
  const serviceId = "service_qdhu9rn";
  const templeteId = "template_tf7f37h";
  emailjs
    .send(serviceId, templeteId, templateParams)
    .then((response) => {
      email = "";
      alert("SUCCESS!", response.status, response.text);
    })
    .catch((err) => {
      alert("FAILED...", err);
    });
  return password;
}
// push user to new url

// it wants to transfer new routers

window.addEventListener("popstate", router);
function navigateTo(url) {
  history.pushState(null, null, url); //user transfer new page
  router();
}
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.hasAttribute("data-link")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  router();
});
