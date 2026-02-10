"use client";

import { useCallback, useState } from "react";

import { Lightbox } from "@/components/ui/lightbox";
import { ProjectGallery } from "@/components/ui/project-gallery";
import type { GalleryImage } from "@/lib/types/content";

type ProjectGallerySectionProps = {
  images: GalleryImage[];
  projectTitle: string;
};

export function ProjectGallerySection({ images, projectTitle }: ProjectGallerySectionProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleImageClick = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  return (
    <>
      <ProjectGallery
        images={images}
        projectTitle={projectTitle}
        onImageClick={handleImageClick}
      />
      <Lightbox
        images={images}
        initialIndex={lightboxIndex}
        open={lightboxOpen}
        onClose={handleClose}
      />
    </>
  );
}
