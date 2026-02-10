import { blogPostType } from "@/sanity/schemaTypes/blog";
import { faqType } from "@/sanity/schemaTypes/faq";
import { processStepType } from "@/sanity/schemaTypes/processStep";
import { projectType } from "@/sanity/schemaTypes/project";
import { serviceType } from "@/sanity/schemaTypes/service";

export const schemaTypes = [projectType, serviceType, processStepType, faqType, blogPostType];
