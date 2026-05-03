import TestimonialForm from "@/components/admin/TestimonialForm";
import { addTestimonialAction } from "@/lib/actions";

export const metadata = { title: "Add testimonial — DevBooks Admin" };

export default function AddTestimonialPage() {
  return (
    <TestimonialForm
      action={addTestimonialAction}
      submitLabel="Create testimonial"
      title="Add a testimonial"
      subtitle="Will appear on the homepage in the order you choose."
      defaults={{
        accent: "from-brand-500 to-brand-700",
        is_active: true,
        display_order: 0,
      }}
    />
  );
}
