import { render } from "@react-email/components";

function CreatedAccount(data: any) {
  return <div>html</div>;
}

export default function createdAccountTemplate(data: any = {}) {
  return render(
    <CreatedAccount
      data={data}
    />,
    {
      pretty: true,
    }
  );
}
