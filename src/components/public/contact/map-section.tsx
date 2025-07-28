import { Card } from '@/components/ui/card';

export const MapSection = () => {
  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Plan d&apos;accès</h2>
      <Card className="overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.8521234567!2d15.2429!3d-4.2634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMTUnNDguMiJTIDE1wrAxNCczMi40IkU!5e0!3m2!1sfr!2scg!4v1234567890"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Card>
    </div>
  );
}; 