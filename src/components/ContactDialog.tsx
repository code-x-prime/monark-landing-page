"use client";

import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ContactDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

interface FormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
}

const ContactDialog = ({ open, onOpenChange }: ContactDialogProps) => {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string>('');

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Phone validation
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setSuccessMessage('');
        setErrors({});

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit form');
            }

            // Show success message
            setSuccessMessage(data.message || 'Form submitted successfully!');

            // Log data to console
            console.log('Contact Form Data:', {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                message: formData.message || '(No message provided)',
                submittedAt: new Date().toISOString(),
            });

            // Reset form after 2 seconds
            setTimeout(() => {
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: '',
                });
                setErrors({});
                setSuccessMessage('');
                // Close dialog
                onOpenChange(false);
                router.push('/thank-you');
            }, 2000);
        } catch (error: unknown) {
            console.error('Error submitting form:', error);
            const errorMessage = error instanceof Error
                ? error.message
                : 'Something went wrong. Please try again.';
            setErrors({ email: errorMessage });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (field: keyof FormData) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: e.target.value,
        }));
        // Clear error when user starts typing
        if (errors[field as keyof FormErrors]) {
            setErrors((prev) => ({
                ...prev,
                [field]: undefined,
            }));
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Get in Touch</DialogTitle>
                    <DialogDescription>
                        Fill out the form below and we&apos;ll get back to you as soon as possible.
                    </DialogDescription>
                </DialogHeader>

                {successMessage && (
                    <div className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                        <p className="text-sm text-green-400 font-medium">{successMessage}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    {/* Name Field */}
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                            Name <span className="text-primary">*</span>
                        </label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange('name')}
                            disabled={isLoading}
                            className={errors.name ? 'border-primary' : ''}
                        />
                        {errors.name && (
                            <p className="text-sm text-primary">{errors.name}</p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                            Email <span className="text-primary">*</span>
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={handleChange('email')}
                            disabled={isLoading}
                            className={errors.email ? 'border-primary' : ''}
                        />
                        {errors.email && (
                            <p className="text-sm text-primary">{errors.email}</p>
                        )}
                    </div>

                    {/* Phone Field */}
                    <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">
                            Phone Number <span className="text-primary">*</span>
                        </label>
                        <Input
                            id="phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleChange('phone')}
                            disabled={isLoading}
                            className={errors.phone ? 'border-primary' : ''}
                        />
                        {errors.phone && (
                            <p className="text-sm text-primary">{errors.phone}</p>
                        )}
                    </div>

                    {/* Message Field */}
                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                            Message
                        </label>
                        <textarea
                            id="message"
                            placeholder="Tell us about your requirements (optional)"
                            value={formData.message}
                            onChange={handleChange('message')}
                            disabled={isLoading}
                            rows={4}
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="default"
                            disabled={isLoading}
                            className="min-w-[120px]"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                'Submit'
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ContactDialog;


