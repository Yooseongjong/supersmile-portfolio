'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function ContactForm() {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

    const validate = () => {
        const newErrors: typeof errors = {};
        if (!formState.name.trim()) newErrors.name = "Name is required";
        if (!formState.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
            newErrors.email = "Invalid email format";
        }
        if (!formState.message.trim()) newErrors.message = "Message is required";

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
                body: JSON.stringify(formState),
            });

            if (!response.ok) throw new Error('Failed to send message');

            setIsSuccess(true);
            setFormState({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Submission error:', error);
            setErrors({ ...errors, message: 'Failed to send message. Please try again later.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClasses = "w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-white/30 focus:border-primary focus:outline-none transition-colors duration-300";

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-12 bg-white/5 rounded-2xl border border-white/10"
            >
                <h3 className="text-3xl font-display font-bold text-white mb-4">Message Sent</h3>
                <p className="text-white/60">We&apos;ll get back to you shortly.</p>
                <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-8 text-primary hover:text-white transition-colors"
                >
                    Send another message
                </button>
            </motion.div>
        );
    }

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-lg mx-auto space-y-8 text-left"
        >
            <div>
                <input
                    type="text"
                    placeholder="YOUR NAME"
                    required
                    className={inputClasses}
                    value={formState.name}
                    onChange={e => setFormState({ ...formState, name: e.target.value })}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
                <input
                    type="email"
                    placeholder="YOUR EMAIL"
                    required
                    className={inputClasses}
                    value={formState.email}
                    onChange={e => setFormState({ ...formState, email: e.target.value })}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
                <textarea
                    placeholder="TELL US ABOUT YOUR PROJECT"
                    required
                    rows={4}
                    className={`${inputClasses} resize-none`}
                    value={formState.message}
                    onChange={e => setFormState({ ...formState, message: e.target.value })}
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>

            <div className="pt-4 flex justify-center">
                <Button
                    size="lg"
                    variant="primary"
                    className="w-full md:w-auto min-w-[200px]"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                </Button>
            </div>
        </motion.form>
    );
}
