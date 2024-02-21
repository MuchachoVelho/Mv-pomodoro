import {HandPalm, Play} from 'phosphor-react'
import {useForm, FormProvider} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { useContext, } from 'react'
import * as zod from 'zod'
import {
    HomeContainer,
    StartCountDownButton, 
    StopCountDownButton
} from './styles'
import { NewCycleForm } from './NewCycleForm'
import { CountDown } from './CountDown'
import { CyclesContext } from '../../context/CyclesContext'







const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Give the task'),
    minutesAmount: zod.number().min(5).max(60),
    
})
type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>


export function Home(){

   const {activeCycle, createNewCycle, interruptCurrentCycle} = useContext(CyclesContext)
    
    const newCycleForm = useForm<newCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: "",
            minutesAmount:0
        },
    })

    const { handleSubmit, watch,reset } = newCycleForm


    function handleCreateNewCycle(data: newCycleFormData){
        createNewCycle(data)
        reset()
    }


    const task = watch('task')
    const isSubmitDisabled = !task

    return (
<HomeContainer>
<form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}> 
            <NewCycleForm/>
        </FormProvider>
        <CountDown />

        {activeCycle ? (
                <StopCountDownButton type="button"  onClick={interruptCurrentCycle}>
                <HandPalm size={24}/>
                Stop
                </StopCountDownButton>
        ) : ( 
            <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24}/>
            Play
            </StartCountDownButton>           
        )}
</form>
</HomeContainer>
    )
}