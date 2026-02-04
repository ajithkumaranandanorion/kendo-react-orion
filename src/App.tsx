import appstyle from "./modules/app.module.css"
import GroupListComponent from "./component/GroupListComponent";
import Header from "./layouts/header/Header";
import Sidebar from "./layouts/sidebar/Sidebar";
import { SelectedKendoProvider } from "./features/KendoContext";

function App() {
  return (
    <SelectedKendoProvider>
    <div className={appstyle.appWrapper} >
        <header className={appstyle.header} ><Header/></header>
        <aside className={appstyle.sidebar} ><Sidebar/></aside>
        <main className={appstyle.main} >
       <GroupListComponent/>
      </main>
    </div>
    </SelectedKendoProvider>
  )
}

export default App
