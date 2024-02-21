
import {FormContainer, MinutesAmountInput, TaskInput} from './styles'
import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../context/CyclesContext'



export function NewCycleForm(){
    const {activeCycle} = useContext(CyclesContext)
   const {register} = useFormContext()
    return(
        <FormContainer>
        
        <label htmlFor="">I'll work in</label>
        <TaskInput 
        id="task" 
        placeholder='Give a name for your project'
        list='taskSuggestions'
        disabled={!!activeCycle}
        {...register('task')}
        />

        <datalist id='taskSuggestions'>
            <option value="Projeto 1"></option>
            <option value="Projeto 2"></option>
            <option value="Projeto 3"></option>
        </datalist>

        <label htmlFor="minutosAmount">for</label>
        <MinutesAmountInput
         type="number" 
         id="minutesAmount" 
         placeholder='00'
         step={5}
         min={5}
         max={60}
         {...register('minutesAmount',{valueAsNumber:true})}
         disabled={!!activeCycle}
         />

        <span>minutes</span>
    </FormContainer>
    )
}