'use client'

import { SignIn } from "@clerk/nextjs"
import { neobrutalism, shadcn, shadesOfPurple } from "@clerk/themes"
import Image from "next/image"

export default function LandingPage(){
    return(
        <main className="flex items-center p-10 gap-24 animate-fade-in max-md:flex-col">
            {/* Section with branding, heading, subheading and illustration*/}
            <section className="flex flex-col items-center">
                {/* app logo */}
                <Image
                src='/assets/logo.svg'
                width={300}
                height={300}
                alt="Logo"
                />

                {/*Main Heading*/}
                <h1 className="text-2xl font-black lg:text-3xl">Your time, perfectly planned</h1>

                {/*Sub Heading*/}
                <p className="font-extralight">Join millions of professionals who easily book meeting with the #1 scheduling tool</p>

                <Image
                src='/assets/planning.svg'
                width={500}
                height={500}
                alt="Illustration"
                />

            </section>

        {/* clerk Sign-In component with custom theme*/}
        <div className="mt-3">
            <SignIn
            routing="hash" //keep sign-in UI on the same page using hash-based routing

            appearance={{
                baseTheme: neobrutalism, //applies the neobrutalism theme style to the sign-in UI
            }}
            />
        </div>
        </main>
    )
}