import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              alt="Patiently App"
              src="/logo.svg"
              height={40}
              width={40}
              className="h-10 w-auto"
            />
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#features"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="#security"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Security
            </Link>
            <Link
              href="#pricing"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline-shad-cn">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button variant="primary">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Secure Electronic Health Records
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    MediRecord provides a HIPAA-compliant platform for managing
                    patient records, appointments, and medical history.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button size="lg" className="w-full" variant="primary">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="#demo">
                    <Button
                      size="lg"
                      variant="outline-shad-cn"
                      className="w-full"
                    >
                      View Demo
                    </Button>
                  </Link>
                </div>
              </div>
              <img
                src="/placeholder.svg?height=550&width=800"
                alt="Electronic Health Record Dashboard"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                width={550}
                height={310}
              />
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted/40"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Everything you need for patient care
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides comprehensive tools for healthcare
                  providers to manage patient records efficiently and securely.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Records</CardTitle>
                  <CardDescription>
                    Securely store and access patient information.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Maintain comprehensive patient profiles including
                    demographics, insurance information, and contact details.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Medical History</CardTitle>
                  <CardDescription>
                    Track patient medical history over time.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Document diagnoses, treatments, medications, allergies, and
                    other critical health information.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Appointment Scheduling</CardTitle>
                  <CardDescription>
                    Manage patient appointments efficiently.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Schedule, reschedule, and track appointments with an
                    intuitive calendar interface.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Prescription Management</CardTitle>
                  <CardDescription>
                    Handle prescriptions digitally.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Create, renew, and track prescriptions with built-in drug
                    interaction checks.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Lab Results</CardTitle>
                  <CardDescription>
                    Access and manage lab results.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    View, analyze, and share lab results with patients and other
                    healthcare providers.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Billing Integration</CardTitle>
                  <CardDescription>
                    Streamline the billing process.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Integrate with billing systems to manage insurance claims
                    and patient payments.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="security" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Security
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  HIPAA Compliant Security
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform is built with security and compliance at its
                  core.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Data Encryption</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    All data is encrypted at rest and in transit to ensure
                    patient information remains secure.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Access Controls</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Role-based access controls ensure that only authorized
                    personnel can access sensitive information.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Audit Trails</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Comprehensive audit logs track all system access and changes
                    to patient records.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Backup & Recovery</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Automated backups and point-in-time recovery ensure data is
                    never lost.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © 2025 MediRecord. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:underline"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/hipaa"
              className="text-sm text-muted-foreground hover:underline"
            >
              HIPAA Compliance
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
