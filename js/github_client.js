//define functions here
let token = `YOUR_TOKEN_HERE`;

let username = `YOUR_USERNAME_HERE`;

var createGist = function(token) {
  let file_name = $("#fileName").val()
  let description = $("#description").val()
  let content = $("#content").val()
  console.log(file_name);
	$.ajax({
		url: "https://api.github.com/gists",
		type: "POST",
		dataType: "json",
    // headers: {
    //   Authorization: "token " + token
    // },
    beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "token " + token);
    },
		data: JSON.stringify({
			description: description,
			public: true,
			"files": { [file_name]: { "content": content } }
		})
	}).done(function(res){
    let newLi = document.createElement("li")
    newLi.innerHTML = res.files[file_name].filename
    $("#gistList").prepend(newLi)
    console.log(res);
  });
};

var myGists = function(username, token)
	$.ajax({
		url: "https://api.github.com/users/" + username + "/gists",
		type: "GET",
		dataType: "json",
		headers: {
			Authorization: "token " + token
		}
	}).done(function(res) {
		for (let i = 0; i < res.length; i++) {
			for (let key in res[i].files) {
				let fName = res[i].files[key].filename;
				let gistList = $("#gistList");
				let newLi = document.createElement("li");
				newLi.innerHTML = `<a href="${res[i].html_url}">${fName}</a>`;
				gistList.append(newLi);
			}
		}
	});
};

var bindCreateButton = function() {
	// call functions here
};

$(document).ready(function() {
	myGists(username, token);

  $("form").on("submit", function(event) {
    event.preventDefault();
    createGist(token)
  })

});
