import { ReactNode, createContext, useEffect, useReducer, useState } from "react";
import { Cycle, cyclesReduzer} from '../reduces/cycles/reducer'
import { addNewCycleAction, markCurrentCycleAsFinishedAction, interruptCurrentCycleAction  } from "../reduces/cycles/actions";
import { differenceInSeconds } from "date-fns";
interface CreateNewCycleData {
    task: string
    minutesAmount: number
}


interface CyclesContextType  {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null;
    amountSecondsPassed: number,
    markCurrencyCycleAsFinished: () => void
    setSecondsPassed: (seconds:number) => void
    createNewCycle: (data: CreateNewCycleData) => void
    interruptCurrentCycle: () => void
}
export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
    children: ReactNode
}



export function CyclesContextProvider({children,}:CyclesContextProviderProps) {

    
    const [cyclesState, dispatch] = useReducer(cyclesReduzer,
       
    {
        cycles: [],
        activeCycleId: null
    }, (inicialState) => {
        const storedStateAsJSON = localStorage.getItem('@pomodoro:cycles-state')
        if(storedStateAsJSON) {
            return JSON.parse(storedStateAsJSON)
        }
        return  inicialState
          
        },
    
    )
    const { cycles, activeCycleId} = cyclesState
    const activeCycle = cycles.find((cycle) => cycle.id == activeCycleId)

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
        if(activeCycle){
            return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
        }
        return 0

    })

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState)

        localStorage.setItem('@pomodoro:cycles-state', stateJSON)
    },[cyclesState])
    

    function setSecondsPassed(seconds: number){
        setAmountSecondsPassed(seconds)
    }
    
     function markCurrencyCycleAsFinished() {
        dispatch(markCurrentCycleAsFinishedAction())
       
    }

    function createNewCycle(data: CreateNewCycleData){
        const id = String(new Date().getTime())
        const NewCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }
        
        dispatch(addNewCycleAction(NewCycle))
       
           
           setAmountSecondsPassed(0)
         
       }
      
      function interruptCurrentCycle(){
        dispatch(interruptCurrentCycleAction())
       

      }    
    return(
        <CyclesContext.Provider 
        value={{
            cycles,
            activeCycle, 
            activeCycleId, 
            markCurrencyCycleAsFinished, 
            amountSecondsPassed,
            setSecondsPassed,
            createNewCycle,
            interruptCurrentCycle


            }}
            > 
            {children}
            </CyclesContext.Provider>
    )
}