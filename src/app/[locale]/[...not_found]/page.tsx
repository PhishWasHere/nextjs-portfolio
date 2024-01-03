'use client'
import { Link } from '@/navigation'
import { useTranslations } from 'next-intl'

export default function NotFound() {
  const t = useTranslations('404');
  return (
    <div className='text-center text-base'>
      <h2 className='text-lg'>{t("desc")}</h2>
    </div>
  )
}