import { useContext } from "react"
import { CyclesContext } from "../../context/CyclesContext"
import {HistoryContainer, HistoryList, Status} from "./styles"
import { formatDistanceToNow } from "date-fns"
export function History(){
     const {cycles} = useContext(CyclesContext)


       return(
          <HistoryContainer>
               <h1>My History</h1>

               <HistoryList>
               <table>
                    <thead>
                         <tr>
                              <th>Task</th>
                              <th>Durantion</th>
                              <th>start</th>
                              <th>Status</th>
                         </tr>
                    </thead>
                    <tbody>
                         <tr>
                              <td>Task</td>
                              <td>20 minutes</td>
                              <td>2 months ago</td>
                              <td>Complete</td>
                         </tr>
                         {cycles.map(cycle => { 
                              return (
                                   <tr key={cycle.id}>
                                   <td>{cycle.task}</td>
                                   <td>{cycle.minutesAmount} minutes</td>
                                   <td> {formatDistanceToNow(cycle.startDate,{
                                        addSuffix: true,
                                   })}</td>
                                   <td>
                                        {cycle.finishDate && (
                                             <Status statusColor="green">Finished</Status>
                                        )}
                                        {!cycle.finishDate && !cycle.interruptedDate &&(
                                             <Status statusColor="yellow">in progress</Status>
                                        )}
                                        {cycle.interruptedDate && (
                                             <Status statusColor="red">interrupted</Status>
                                        )}
                                   </td>
                              </tr>
                              )
                          })}
                    </tbody>
               </table>
               </HistoryList>
          </HistoryContainer>
       )
 }