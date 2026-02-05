import appstyle from "./module-css/app.module.css"
import CombinedListComponent from "./component/CombinedListComponent";
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
       <CombinedListComponent/>
      </main>
    </div>
    </SelectedKendoProvider>
  )
}

export default App
