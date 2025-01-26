import { CreateTenantForm } from "~/app/(private)/internal/tenants/CreateTenantForm";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

export function CreateTenantModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline-shad-cn">Create Tenant</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Tenant</DialogTitle>
          <DialogDescription>Make changes to your profile here..</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <CreateTenantForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
