"use client"
import React, { use } from 'react'
import FormSection from './_components/FormSection'
import OutputSection from './_components/OutputSection'
import { Template } from '../../_components/TemplateListSection'
import Templates from '@/app/(data)/Templates'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { generateSambaNovaContent } from '@/app/actions';
import { useState, useContext } from "react";
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import axios from 'axios'  // ← ADD THIS
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext';
import { UpdateCreditUsageContext } from '@/app/(context)/UpdateCreditUsageContext';
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

// REMOVED: db, moment, AIOutputTable imports

interface props {
  params: Promise<{
    'template-slug': string
  }>
}

function CreateNewContent({ params }: props) {
  const unwrappedParams = use(params);
  const selectedTemplate = Templates?.find(
    (item) => item.slug == unwrappedParams['template-slug']
  );
  const [loading, setLoading] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [AIOutput, setAIOutput] = useState<string>('');
  const { user, isLoaded } = useUser();
  const Router = useRouter();
  const { totalUsage } = useContext(TotalUsageContext);
  const { userSubscription } = useContext(UserSubscriptionContext);
  const { setUpdateCreditUsage } = useContext(UpdateCreditUsageContext);

  const GenereteAIContent = async (formData: any) => {
    if (totalUsage >= 10000 && !userSubscription) {
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
    const text = await generateSambaNovaContent(FinalAIPrompt);
    setAIOutput(text);
    await SaveInDb(JSON.stringify(formData), selectedTemplate?.slug, text);
    setLoading(false);
    setUpdateCreditUsage(Date.now());
  }

  const SaveInDb = async (formData: any, slug: any, aiResponse: string) => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      console.error("User information not available, cannot save to DB.");
      return;
    }
    try {
      await axios.post('/api/save-ai-output', {
        formData,
        templateSlug: slug,
        aiResponse,
        createdBy: user.primaryEmailAddress.emailAddress,
      });
    } catch (error) {
      console.error("Failed to save to DB:", error);
    }
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
        <Button className="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white cursor-pointer">
          <ArrowLeft /> Back
        </Button>
      </Link>
      <div className='grid grid-cols-1 md:grid-cols-3 p-5 gap-5'>
        <FormSection selectedTemplate={selectedTemplate}
          userFormInput={(v: any) => GenereteAIContent(v)} loading={loading || !isLoaded} />
        <div className='col-span-2'>
          <OutputSection AIOutput={AIOutput} />
        </div>
      </div>
    </div>
  )
}

export default CreateNewContent