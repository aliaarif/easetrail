<script setup>
useHead({
    title: 'Easetrail | Team',
    meta: [
        { name: 'description', content: 'Our Team' }
    ]
})
</script>
<template>
    <section>
        <h3 class="title mt-6 mb-6">Our Team</h3>

        <div class="columns is-multiline">
                <!-- Team Member 1 -->
                <div class="column is-one-quarter">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-6by3">
                                <img src="/img/about/abcd.jpg" alt="Founder">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content has-text-centered">
                                    <p class="title is-4">Pankaj Yadav</p>
                                    <p class="subtitle is-6">pankajyadav562@gmail.com</p>
                                </div>
                            </div>
                            <div class="content has-text-centered">
                                Pankaj is founder and core team member resposible for new updates on the platform.
                            </div>
                        </div>
                    </div>
                </div>

                 <!-- Team Member 2 -->
                <div class="column is-one-quarter">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-6by3">
                                <img src="/img/about/cto.jpg" alt="CTO">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content has-text-centered">
                                    <p class="title is-4">Mohammed Aarif</p>
                                    <p class="subtitle is-6">ali.aliaarif@gmail.com</p>
                                </div>
                            </div>
                            <div class="content has-text-centered">
                                Aarif is CTO and fullstack developer, who ensure latest development and maintain security.
                            </div>
                        </div>
                    </div>
                </div>

                 <!-- Team Member 3 -->
                <div class="column is-one-quarter">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-6by3">
                                <img src="/img/about/profile.jpg" alt="Designer">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content has-text-centered">
                                    <p class="title is-4">Abhishek Kumar</p>
                                    <p class="subtitle is-6">redmiabhishek@gmail.com</p>
                                </div>
                            </div>
                            <div class="content has-text-centered">
                                Abhishek is the person who maintain best user interaction of this platform.
                            </div>
                        </div>
                    </div>
                </div>
                 <!-- Team Member 4 -->
                <!-- <div class="column is-one-quarter">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-6by3">
                                <img src="" alt="CEO">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content has-text-centered">
                                    <p class="title is-4">Mohammed Aarif</p>
                                    <p class="subtitle is-6">ali.aliaarif@gmail.com</p>
                                </div>
                            </div>
                            <div class="content has-text-centered">
                                Aarif is a fullstack developer with 10 years of experience in web application developements.
                            </div>
                        </div>
                    </div>
                </div> -->

                <!-- You can repeat the "column is-one-quarter" block for each team member -->

            </div>

    </section>
</template>