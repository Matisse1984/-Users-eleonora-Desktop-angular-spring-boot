class SecurityConfiguration : WebSecurityConfigurerAdapter() {
    override fun configure(http: HttpSecurity) {
        //@formatter:off
        http
            .authorizeRequests().anyRequest().authenticated()
                .and()
            .oauth2Login()
                .and()
            .oauth2ResourceServer().jwt()

        http.requiresChannel()
            .requestMatchers(RequestMatcher {
                r -> r.getHeader("X-Forwarded-Proto") != null
            }).requiresSecure() 

        http.csrf()
            .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()); 

        http.headers()
            .contentSecurityPolicy("script-src 'self'; report-to /csp-report-endpoint/"); 
       //@formatter:on
    }
}