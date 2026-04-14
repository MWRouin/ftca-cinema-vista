import React, { useState } from 'react'
import { X, Copy, Share2 } from 'lucide-react'

type Article = {
	id: number
	title: string
	excerpt: string
	author: string
	date: string
	category: string
	readTime: string
	image?: string
	body?: string
	lang?: string
}

export function ArticleModal({
	article,
	open,
	onClose,
}: {
	article: Article | null
	open: boolean
	onClose: () => void
}) {
	if (!open || !article) return null

	const [copied, setCopied] = useState(false)

	const formatDate = (dateString: string) => {
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		}
		return new Date(dateString).toLocaleDateString('en-US', options)
	}

	const handleCopy = async (e: React.MouseEvent) => {
		e.stopPropagation()
		try {
			await navigator.clipboard.writeText(window.location.href)
			setCopied(true)
			setTimeout(() => setCopied(false), 1800)
		} catch {
			// ignore copy failure
		}
	}

	const handleShareFB = (e: React.MouseEvent) => {
		e.stopPropagation()
		const shareUrl = encodeURIComponent(window.location.href)
		window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank')
	}

	return (
		<div
			role="dialog"
			aria-modal="true"
			className="fixed inset-0 z-50 flex items-center justify-center p-4"
		>
			<div
				className="absolute inset-0 bg-black/60 backdrop-blur-sm"
				onClick={onClose}
			/>
			<div className="relative z-10 w-full max-w-4xl mx-auto max-h-[90vh] overflow-auto rounded-lg bg-background shadow-2xl">
				{article.image ? (
					<div className="w-full aspect-[16/7] overflow-hidden">
						<img
							src={article.image}
							alt={article.title}
							className="w-full h-full object-cover"
						/>
					</div>
				) : null}
				<div className="p-6 md:p-8">
					<div className="flex items-start justify-between">
						<div>
							<h2 className={"text-2xl md:text-3xl mb-2 " + (article.id === 2 ? 'font-extrabold' : 'font-semibold') }>
								{article.title}
							</h2>
							<div className="text-sm text-muted-foreground">
								By {article.author} • {formatDate(article.date)} • {article.readTime}
							</div>
						</div>
						<div className="ml-4 flex items-center gap-2">
							<button
								onClick={handleCopy}
								aria-label="Copy link"
								className="rounded-md px-3 py-2 text-sm flex items-center gap-2 border hover:bg-muted/10"
							>
								<Copy className="h-4 w-4" />
								<span>{copied ? 'Copied' : 'Copy link'}</span>
							</button>

							<button
								onClick={handleShareFB}
								aria-label="Share on Facebook"
								className="rounded-md px-3 py-2 text-sm flex items-center gap-2 border hover:bg-muted/10"
							>
								<Share2 className="h-4 w-4" />
								<span>Share</span>
							</button>

							<button
								onClick={onClose}
								aria-label="Close"
								className="rounded-md p-2 text-muted-foreground hover:bg-muted/30"
							>
								<X className="h-5 w-5" />
							</button>
						</div>
					</div>

					  <div dir={article.lang === 'ar' ? 'rtl' : 'ltr'} className={"mt-6 prose prose-lg max-w-none text-base text-muted-foreground leading-relaxed " + (article.lang === 'ar' ? 'text-right' : 'text-left')}>
						{article.body ? (
							article.body.split('\n\n').map((para, idx) => {
								const t = para.trim()
								if (t.startsWith('## ')) {
									const subtitle = t.slice(3)
									const subClass = article.lang === 'ar' ? 'text-right text-lg font-semibold my-4' : 'text-center text-lg font-semibold my-4'
									return (
										<h3 key={idx} className={subClass}>{subtitle}</h3>
									)
								}
								return <p key={idx}>{t}</p>
							})
						) : (
							<>
								<p>{article.excerpt}</p>
								<p>
									This is the full view of the article. Replace this placeholder with
									the article body when available.
								</p>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ArticleModal

