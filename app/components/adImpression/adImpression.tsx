import style from './adImpression.module.css';

interface impression {
    created_at: Date,
    reward_cents: number
    ad_title: string,
}

export default function AdImpression({impression}: {impression: impression}) {

    function convertCents(cents: number): string {
        let dollars = Math.floor(cents / 100);
        cents = cents % 100;
        let cnt = '';
        if (cents > 9) cnt = `${cents}`;
        else cnt = `0${cents}`;
        console.log(dollars, cnt);
        return `$${dollars.toString()}.${cnt}`
    }

    function timeAgo(date: Date) {
        const now = new Date();
        const inputDate = date instanceof Date ? date : new Date(date);
        const diffMs = now.getTime() - inputDate.getTime();

        const seconds = Math.floor(diffMs / 1000);
        if (seconds < 5) return 'just now';
        if (seconds < 60) return `${seconds}s ago`;

        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;

        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;

        const days = Math.floor(hours / 24);
        if (days < 30) return `${days}d ago`;

        const months = Math.floor(days / 30);
        if (months < 12) return `${months}mo ago`;

        const years = Math.floor(months / 12);
        return `${years}y ago`;
    }
    return (
        <div className={style.card}>
            <h1 className={style.header}>
                {impression.ad_title}
            </h1>
            <div className={style.subHeader}>
                <div>{convertCents(impression.reward_cents)}</div>
                <div>{timeAgo(impression.created_at)}</div>
            </div>
        </div>
    )
}