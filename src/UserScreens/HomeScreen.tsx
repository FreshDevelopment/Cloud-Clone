import React,{useState} from 'react'
import '../Styles/UsersHomeScreen.css'
interface Task{
  title: string;
  tasks: number;
  icon: string;
  color: string;
}
const HomeScreen = () => {

  const [tasks, setTaks] = useState<Task[]>([
    { title: "Por Hacer", tasks: 0, icon: "s", color: "#E46472" },
    { title: "Para esta semana", tasks: 0, icon: "d", color: "#F9BE7C" },
    {title:"Hechas",tasks:0,icon:"s",color:"#6488E4"}
  ]);
  return (
    <div>
      <div className="HomeBar">
        <div className="HomeBar-Profile">
          <h1>Hola</h1>
          <h2>hola</h2>
          <img src="https://www.dzoom.org.es/wp-content/uploads/2010/09/mirada-ojos-encuadre-primer-plano-sexy-810x540.jpg"></img>
        </div>
        <div className="HomeBar-Tasks">
        <h1>Mis Deberes</h1>
          {
            tasks.map((item:Task,index:number) => {
              return (
                <div className="TasksContainer" key={index} >
                  <div className="TasksIcon" style={{background:item.color}}>
                    <h1>{ item.icon}</h1>
                  </div>
                  <div className="TasksInformation">
                    <h2>{item.title}</h2>
                    <h4>{ item.tasks} tareas</h4>
                    </div>
                 </div>
              )
            })
          }
        </div>
       </div>
    </div>
  )
}

export default HomeScreen
