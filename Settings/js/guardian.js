const itsAdmin = sessionStorage.getItem("role");
const itsVisitor = sessionStorage.getItem("role");

if(!itsAdmin || !itsVisitor){
    window.location ="../../index.html";
}