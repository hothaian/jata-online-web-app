
import MainDash from '../components/DashBoard/MainDash/MainDash';
import RightSide from '../components/DashBoard/RigtSide/RightSide';
import Sidebar from '../components/DashBoard/SideBar';

function DashBoard() {
  return (
    
      <div className="AppGlass">
        <Sidebar/>
        <MainDash/>
        <RightSide/>
      </div>
   
  );
}

export default DashBoard;