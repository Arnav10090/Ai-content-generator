"use client"
import React, { use } from 'react'
import FormSection from './_components/FormSection'
import OutputSection from './_components/OutputSection'
import { Template } from '../../_components/TemplateListSection'
import  Templates  from '@/app/(data)/Templates'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { GoogleGenerativeAI } from "@google/generative-ai"
import { useState } from "react";
import { db } from '@/utils/db'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { AIOutput as AIOutputTable } from '@/utils/schema'
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext';
import { UpdateCreditUsageContext } from '@/app/(context)/UpdateCreditUsageContext';
import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface props{
    params:{
        'template-slug':string
    }
}

function isPromise<T>(value: T | Promise<T>): value is Promise<T> {
    return typeof (value as any)?.then === 'function';
}

function CreateNewContent({params}:props) {
    const unwrappedParams = isPromise(params) ? use(params) : params;
    const selectedTemplate:Template|undefined = Templates?.find((item) => item.slug == unwrappedParams['template-slug']);
    const[loading,setLoading] = useState(false);
    const [showAlertDialog, setShowAlertDialog] = useState(false);
    const [AIOutput,setAIOutput] = useState<string>('');
    const {user, isLoaded} = useUser();
    const Router = useRouter();
    const {totalUsage, setTotalUsage} = useContext(TotalUsageContext);
    const {userSubscription, setUserSubscription} = useContext(UserSubscriptionContext);
    const {updateCreditUsage, setUpdateCreditUsage} = useContext(UpdateCreditUsageContext);

    const GenereteAIContent = async (formData: any) => {
      if(totalUsage >= 10000 && !userSubscription){
        setShowAlertDialog(true);
        return;
      }
      setLoading(true);
      if (!user || !user.primaryEmailAddress?.emailAddress) {
        alert("User not loaded. Please wait and try again.");
        setLoading(false);
        return;
      }
      const SelectedPrompt = selectedTemplate?.aiPrompt;
      const FinalAIPrompt = JSON.stringify(formData) + ", " + SelectedPrompt + ". Return the result as HTML only, using tags like <b>, <ul>, <li>, <p> as appropriate for rich text editors. Do not use markdown, code blocks, or RTF. Do not wrap everything in a single <p> or <ul> unless it is semantically correct. The output should be ready to render in a WYSIWYG editor.";
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY!);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
      const result = await model.generateContent(FinalAIPrompt);
      const response = await result.response;
      const text = response.text();
      setAIOutput(text);
      await SaveInDb(JSON.stringify(formData),selectedTemplate?.slug,text)
      setLoading(false);
      setUpdateCreditUsage(Date.now())
    } 

    const SaveInDb=async(formData:any,slug:any,aiResponse:string)=>{
      if (!user?.primaryEmailAddress?.emailAddress) {
        // Handle the case where user information is not available
        console.error("User information not available, cannot save to DB.");
        return;
      }
      const result=await db.insert(AIOutputTable).values({
          formData:formData,
          templateSlug:slug,
          aiResponse:aiResponse,
          createdBy:user.primaryEmailAddress.emailAddress,
          createdAt:moment().format('DD/MM/yyyy'),
      });

      console.log(result);
  }
  return (
    <div className='p-5'>
      <AlertDialog open={showAlertDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>You've Reached Your Credit Limit</AlertDialogTitle>
            <AlertDialogDescription>
              You have used all of your available credits. Please upgrade your plan to continue generating content.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowAlertDialog(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => Router.push('/dashboard/billing')}>Upgrade</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Link href='/dashboard'>
      <Button className='bg-blue-700 hover:bg-blue-600 cursor-pointer'><ArrowLeft/> Back</Button>
      </Link>
    <div className='grid grid-cols-1 md:grid-cols-3 p-5 gap-5'>
      <FormSection selectedTemplate={selectedTemplate} 
      userFormInput={(v:any) => GenereteAIContent(v)} loading={loading || !isLoaded}/>
      <div className='col-span-2'>
      <OutputSection  AIOutput={AIOutput}/>
      </div>
      
    </div>
    </div>
  )
}

export default CreateNewContent
