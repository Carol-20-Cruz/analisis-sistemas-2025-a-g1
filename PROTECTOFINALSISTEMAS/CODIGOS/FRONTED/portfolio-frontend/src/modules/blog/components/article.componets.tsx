import Image from 'next/image'
import React from 'react'

interface ArticleProps {
  imageUrl: string
  category: string
  title: string
  description: string
}

export default function Article({ imageUrl, category, title, description }: ArticleProps) {
  return (
    <article className="rounded-xl flex flex-col gap-1 group bg-neutral-900 hover:cursor-pointer">
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl">
        <Image
          src={imageUrl}
          alt={`Imagen de ${title}`}
          fill
          className="object-cover object-center rounded-xl group-hover:scale-110 transition-transform"
        />
      </div>
      <div className="flex flex-col gap-3 px-4 py-5">
        <p className="text-gray-500">{category}</p>
        <h3 className="text-xl text-white font-bold">{title}</h3>
        <p className="text-white">{description}</p>
      </div>
    </article>
  )
}