import React, {useEffect, useState} from "react";
import {MyService} from "../services/TestService";
import {ServicesManager} from "@reysin/project";

export default function Home() {
  const [myService] = useState(new ServicesManager().getService<typeof MyService>('TestService'))

  useEffect(() => {
    myService.updateData({ foo: 'bar' });
    const data = myService.getData();
    console.log(data)
  },[])

  return (
    <p>Welcome Home</p>
  )
}