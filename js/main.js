document.getElementById("myForm").addEventListener('submit', saveBookmark);

//save BOokmark
function saveBookmark(e){
	//get form value
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteurl').value;
    
    if(!validateForm(siteName, siteUrl)){
    	return false;
    }
var bookmark = {
	name: siteName,
	url : siteUrl
}

/*//local storage test
localStorage.setItem('test', "Hello World");
console.log(localStorage.getItem('test,'));
localStorage.removeItem('test');*/
if(localStorage.getItem('bookmarks') === null){
	var bookmarks = [];
	bookmarks.push(bookmark);
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
} else{
	//get bookmarks from localstorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
   //Add bookamrk to array
   bookmarks.push(bookmark);
   //re-set back to local storage
 localStorage.setItem('bookmarks', JSON.stringify(bookmarks));  
}

//clear form
document.getElementById('myForm').reset();
//refetch bookmarks
fetchBookmarks();
//prevent from form submitting
e.preventDefault();
}
function deleteBookmark(url){
	var bookmarks= JSON.parse(localStorage.getItem('bookmarks'));
//loop through bookmarks
for(var i =0; i< bookmarks.length; i++){
	if(bookmarks[i].url == url){
		bookmarks.splice(i, 1);
	}
}
 localStorage.setItem('bookmarks', JSON.stringify(bookmarks));  
//refetch bookmarks
fetchBookmarks();

}
//fetch bookmarks
function fetchBookmarks(){
	var bookmarks= JSON.parse(localStorage.getItem('bookmarks'));
	var bookmarksResults=document.getElementById("bookmarksResults");

	bookmarksResults.innerHTML ='';
	
	for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="well">'+ 
                                    '<h3>' +name+
                                    ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>' +
                                     ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'+
                                     '</h3'+
                                     '</div>';
	}
}
//validte form
function validateForm(siteName, siteUrl){
	 if(!siteName || !siteUrl){
    	alert('please fill in the form')
    	return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);

if(!siteUrl.match(regex)){
	alert('Please use a valid URl');
	return false;
}
return true;
}