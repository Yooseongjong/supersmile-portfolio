'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const CATEGORY_CHIPS = [
    'TVCF · 브랜드 필름',
    '웹 오리지널 · 예능',
    '후반 종편 · 마스터 DI',
    'B2B · 글로벌 제품 필름',
    '시네마틱 AI 영상',
];

function ChipGroup({
    label,
    options,
    values,
    onToggle,
}: {
    label: string;
    options: string[];
    values: string[];
    onToggle: (v: string) => void;
}) {
    return (
        <div>
            <p className="text-xs text-white/45 mb-3">{label}</p>
            <div className="flex flex-wrap gap-2">
                {options.map((o) => {
                    const on = values.includes(o);
                    return (
                        <button
                            type="button"
                            key={o}
                            onClick={() => onToggle(o)}
                            aria-pressed={on}
                            className={`press-tactile rounded-full text-xs md:text-sm px-4 py-2 border transition-colors ${
                                on
                                    ? 'bg-white border-white text-black font-semibold'
                                    : 'border-white/15 bg-white/[0.03] text-white/65 hover:border-white/40 hover:text-white'
                            }`}
                        >
                            {o}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default function ContactForm() {
    const [categories, setCategories] = useState<string[]>([]);
    const toggle = (set: React.Dispatch<React.SetStateAction<string[]>>, multi: boolean) => (v: string) =>
        set((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : multi ? [...prev, v] : [v]));

    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

    const validate = () => {
        const newErrors: typeof errors = {};
        if (!formState.name.trim()) newErrors.name = '성함 또는 기업명을 입력해 주세요.';
        if (!formState.email.trim()) {
            newErrors.email = '회신받으실 이메일을 입력해 주세요.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
            newErrors.email = '올바른 이메일 형식을 입력해 주세요.';
        }
        if (!formState.message.trim()) newErrors.message = '프로젝트 내용을 간단히 적어 주세요.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formState,
                    message: `[프로젝트 유형] ${categories.join(', ') || '미선택'}\n\n${formState.message}`,
                }),
            });

            if (!response.ok) throw new Error('Failed to send message');

            setIsSuccess(true);
            setFormState({ name: '', email: '', message: '' });
            setCategories([]);
        } catch (error) {
            console.error('Submission error:', error);
            setErrors({ ...errors, message: '전송에 실패했습니다. 잠시 후 다시 시도해 주세요.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClasses =
        'w-full bg-transparent border-b border-white/15 py-3.5 text-sm md:text-base text-white placeholder-white/30 focus:border-white focus:outline-none transition-colors duration-200';

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-12 bg-white/[0.04] rounded-2xl border border-white/10"
            >
                <h3 className="text-2xl font-display font-bold text-white mb-3">문의가 접수되었습니다</h3>
                <p className="text-sm text-white/60">확인 후 빠르게 회신드리겠습니다.</p>
                <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-7 text-xs font-medium text-white/75 hover:text-white underline underline-offset-4"
                >
                    추가 문의 작성하기
                </button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-7 text-left">
            <ChipGroup
                label="프로젝트 분야 (복수 선택 가능)"
                options={CATEGORY_CHIPS}
                values={categories}
                onToggle={toggle(setCategories, true)}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <input
                        type="text"
                        placeholder="성함 / 기업·브랜드명"
                        required
                        className={inputClasses}
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>}
                </div>
                <div>
                    <input
                        type="email"
                        placeholder="회신 이메일"
                        required
                        className={inputClasses}
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
                </div>
            </div>
            <div>
                <textarea
                    placeholder="예상 일정, 레퍼런스, 제작 편수 등 편하게 남겨 주세요."
                    required
                    rows={4}
                    className={`${inputClasses} resize-none`}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                />
                {errors.message && <p className="text-red-400 text-xs mt-1.5">{errors.message}</p>}
            </div>

            <div className="pt-2">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="press-tactile rounded-full bg-white text-black px-8 py-3 text-xs md:text-sm font-semibold hover:bg-white/90 disabled:opacity-50"
                >
                    {isSubmitting ? '전송 중...' : '프로젝트 문의 보내기'}
                </button>
            </div>
        </form>
    );
}
