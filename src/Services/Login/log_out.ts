export default function handleLogOut(navigator:Function){
    localStorage.clear();
    navigator("/");
}